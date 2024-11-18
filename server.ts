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

