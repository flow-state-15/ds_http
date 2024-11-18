import { createServerRef } from "./utils/serverUtils";
import type { ServerRef, BoundServer, InitializationError, ServerOptions } from "./types/index";

//!! convert req handlers to async model

export function createServer(options?: ServerOptions): BoundServer {
  const serverRef: ServerRef = createServerRef(options || undefined);
  const dsServer = serverRef();

  if (dsServer) {
    return dsServer;
  } else {
    console.log("Server initialization failed. Error handling coming soon.");
    throw new Error("Oops!") as InitializationError;
  }
}

export default {
  createServer,
};
