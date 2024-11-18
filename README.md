# Dollar Store Http Server

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime. Install Bun before continuing.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```


## Project Description

This lib was an effort to build a web server on the Bun runtime. Bun is written in Zig and is much faster than NodeJS. Bun's native TCP and HTTP libraries are used to accept and decode incoming requests.

API is modeled after Node's ExpressJS, so the basic methods will feel familiar.

Example file `./server.ts`:

```js
//!! this is a lib test file only

import type { DSResponse, DSRequest } from "./lib/types/index";
import dsserver from "./lib/index";

const app = dsserver.createServer();

app.get("/", (req: DSRequest, res: DSResponse) => {
  console.log("hit home route, req: ", req)

  res.send("slash route!")
});

app.get("/tennis", (req: DSRequest, res: DSResponse) => {
  console.log("hit /tennis: ", req)

  res.send("tennis!")
});

app.get("/tennis/racquet", (req: DSRequest, res: DSResponse) => {
  console.log("hit /tennis/racquet: ", req)

  res.send("i want a new tennis racquet!")
});

app.get("/tennis/serve", (req: DSRequest, res: DSResponse) => {
  console.log("hit /tennis/serve: ", req)

  res.send("i need a better tennis serve!")
});

app.post("/post", (req: DSRequest, res: DSResponse) => {
  console.log("post request: ", req)
  res.send("This is a post!")
})

app.listen(3000, () => {
  console.log("Listening on port 3000...")
})

```
More features like request headers, JSON support and middleware support are planned.

Feel free to contribute!
