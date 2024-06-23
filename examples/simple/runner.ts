#!/usr/bin/env bun

import Bun, { $ } from 'bun';
import {printIsBun} from "is-bun";

type RunNodeOptions = {
  useJiti?: boolean;
};

function runScript(importer: () => Promise<unknown>, opts: RunNodeOptions = {}) {
  const importerString = importer.toString();
  const match = importerString.match(/import\(([^)]+)\)/);
  if (!match) {
    throw new Error(
      "Importer function has to be in a form of `() => import('./file'))`, got `" +
        importerString +
        '` instead.',
    );
  }
  const filenameWithQuotes = match[1];
  const filename = filenameWithQuotes.slice(1, -1);
  const filePath = require.resolve(filename);
  const file = Bun.file(filePath);
  if (!file.size) {
    const err = new Error('Failed to import using importer: ' + importerString);
    err.cause = 'File does not exist or empty: ' + filePath;
    throw err;
  }
  if (opts.useJiti) {
    return $`bunx jiti ${filePath}`;
  } else {
    return $`node ${filePath}`.throws(false);
  }
}

console.log("from bun file", __filename);
printIsBun();

await runScript(() => import('./node-js.mjs'));
await runScript(() => import('./node-ts.ts'), { useJiti: true });
