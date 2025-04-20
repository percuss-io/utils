#!/bin/bash

# Run this script via `npm run prerelease` to bump the package to the next beta version.

set -e

npm version prerelease --preid=beta
