# Example of how to use `runScript` function

First, install deps

```bash
bun install
```

Now run

```bash
./runner.ts
```

You will see output

```
from bun file /workspaces/bun-node-runner/examples/simple/runner.ts
Buntime runtime!
from js file /workspaces/bun-node-runner/examples/simple/node-js.mjs
No Bun, no problem
from ts file /workspaces/bun-node-runner/examples/simple/node-ts.ts
No Bun, no problem
```

## What happened?

To run the module using Node environment just do:

```ts
await runScript(() => import('./node-js.mjs'));
```

To get standard output from running the script just change it to:

```ts
const output = await runScript(() => import('./node-js.mjs')).text();
```