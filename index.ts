import { createServerRef, attachHandlers } from "./lib/serverUtils";
import type { DSWebServer, ServerRef, BoundServer, InitializationError } from "./server";

export function createServer(options: any): BoundServer | unknown {
  
  try {
    const serverRef: ServerRef = createServerRef(options || undefined);
    const dsServer = serverRef();

    if (dsServer) {
      console.log("listening on port 3000...");
      return dsServer
    } else {
      console.log("Server initialization failed. Error handling coming soon.");
      return new Error("Oops!") as InitializationError
    }
  } catch (e: unknown){
    console.log("server failed spectacularly! no server for you.");
    return e
  }
}

export default {
  createServer,
}