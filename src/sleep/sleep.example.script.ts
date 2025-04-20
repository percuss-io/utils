/**
 * npx vite-node src/sleep/sleep.example.script.ts
 */

import process from 'node:process';
import { sleep } from './sleep';

async function main() {
  for (let i = 5; i > 0; i -= 1) {
    console.log({ countdown: i });

    await sleep(1000);
  }

  console.log(`Done!`);
}
main().catch((err: unknown) => {
  console.error(`ERROR:`, err);

  process.exit(1);
});
