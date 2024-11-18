# Dollar Store Http Server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Project Description

This lib was an effort to build an http server on the Bun runtime. Bun is written in Zig and is much faster than NodeJS. Bun's native TCP and HTTP server is used to parse incoming requests.

API is modeled after Node's ExpressJS, so the basic methods will feel familiar.

update 11/17/24 So far get handlers are working. 