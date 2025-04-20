/**
 * npx vite-node src/shuffleArray/shuffleArray.example.script.ts
 */

import { shuffleArray } from './shuffleArray';

const input = [`a`, `b`, `c`, `d`, `e`, `f`, `g`];

for (let i = 0; i < 20; i++) {
  const result = shuffleArray(input);

  console.log(JSON.stringify(result));
}
