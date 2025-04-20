#!/bin/bash

# Run this script from package.json via `npm run shipit`.

# Prevent the script from exiting if commands fail and enable better error tracing
set -e
set -o pipefail

# Load configuration from .env file if it exists
if [ -f .env ]; then
  source .env
fi

# Configuration with defaults that can be overridden by environment variables
USERNAME_EXPECTED=${PUBLISH_USERNAME:-"ericcarraway"}
REGISTRY_EXPECTED=${PUBLISH_REGISTRY:-"https://registry.npmjs.org/"}
REQUIRE_CLEAN_GIT=${REQUIRE_CLEAN_GIT:-"true"}
RUN_TESTS=${RUN_TESTS:-"true"}
BUILD_BEFORE_PUBLISH=${BUILD_BEFORE_PUBLISH:-"true"}

# Get package info
package_name=$(node -p "require('./package.json').name")
version=$(node -p "require('./package.json').version")

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

log_info() {
  echo -e "${GREEN}INFO:${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}WARNING:${NC} $1"
}

error_exit() {
  echo -e "${RED}ERROR:${NC} $1" >&2
  exit 255
}

# Check if npm is installed
if ! command -v npm &>/dev/null; then
  error_exit "npm is not installed. Please install npm and try again."
fi

# Verify authentication
username_actual=$(npm whoami 2>/dev/null || echo "")

if [ -z "${username_actual}" ]; then
  error_exit "You are not logged in to npm. Please run 'npm login' first."
fi

if [ "${username_actual}" != "${USERNAME_EXPECTED}" ]; then
  error_exit "publish.sh must be run as user: ${USERNAME_EXPECTED}\nYou are currently ${username_actual}"
fi

# Verify registry
registry_actual=$(npm config get registry)

if [ "${registry_actual}" != "${REGISTRY_EXPECTED}" ]; then
  error_exit "publish.sh must be run with registry: ${REGISTRY_EXPECTED}\nYour current registry is ${registry_actual}"
fi

# Validate version format
if ! [[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?$ ]]; then
  error_exit "Invalid version format: $version"
fi

# Check for git status if required
if [ "$REQUIRE_CLEAN_GIT" = "true" ] && command -v git &>/dev/null; then
  if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    log_warning "Not in a git repository. Skipping git checks."
  else
    if [ -n "$(git status --porcelain)" ]; then
      error_exit "Git working directory is not clean. Please commit or stash your changes."
    fi

    current_branch=$(git branch --show-current)
    main_branch=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)

    if [ "$current_branch" != "$main_branch" ]; then
      log_warning "You are not on the main branch ($main_branch). Currently on: $current_branch"
      read -p "Do you want to continue publishing? (y/n) " -n 1 -r
      echo
      if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error_exit "Publishing cancelled."
      fi
    fi

    # Check if current commit has a tag matching the version
    if ! git rev-parse "v$version" &>/dev/null; then
      log_warning "Current commit is not tagged with v$version"
      read -p "Would you like to tag the current commit with v$version? (y/n) " -n 1 -r
      echo
      if [[ $REPLY =~ ^[Yy]$ ]]; then
        git tag -a "v$version" -m "Version $version"
        log_info "Created tag v$version"
      fi
    fi
  fi
fi

# Run tests if configured
if [ "$RUN_TESTS" = "true" ]; then
  if grep -q '"test"' package.json; then
    log_info "Running tests..."
    npm test || error_exit "Tests failed. Publishing aborted."
  else
    log_warning "No test script found in package.json. Skipping tests."
  fi
fi

# Build if configured
if [ "$BUILD_BEFORE_PUBLISH" = "true" ]; then
  if grep -q '"build"' package.json; then
    log_info "Building package..."
    npm run build || error_exit "Build failed. Publishing aborted."
  else
    log_warning "No build script found in package.json. Skipping build step."
  fi
fi

log_info "All checks passed!"
log_info "Publishing version: $version"

# Set publish arguments
publish_args="--access public"

# Handle tag based on version string
if [[ "$version" == *"alpha"* ]]; then
  publish_args="$publish_args --tag alpha"
  log_info "Publishing as alpha release"
elif [[ "$version" == *"beta"* ]]; then
  publish_args="$publish_args --tag beta"
  log_info "Publishing as beta release"
elif [[ "$version" == *"rc"* ]]; then
  publish_args="$publish_args --tag rc"
  log_info "Publishing as release candidate"
else
  log_info "Publishing as stable release"
fi

log_info "Using npm publish args: '$publish_args'"

# Confirm before publishing
read -p "Ready to publish ${package_name}@${version}. Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  error_exit "Publishing cancelled."
fi

# Publish the package with the determined arguments
log_info "Publishing..."
npm publish $publish_args

echo -e "${GREEN}==============================================${NC}"
log_info "Package published successfully: https://www.npmjs.com/package/${package_name}/v/${version}"
echo -e "${GREEN}==============================================${NC}"
