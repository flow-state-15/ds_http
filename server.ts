//!! this is a lib test file only

import type { DSResponse, DSRequest } from "./lib/types/index";
import dsserver from "./lib/index";

const app = dsserver.createServer();

app.get("/", (req: DSRequest, res: DSResponse) => {
  console.log("in get handler, outside lib, req: ", req)

  res.send("testing send")
});

app.listen(3000, () => {
  console.log("start message from outside")
})

