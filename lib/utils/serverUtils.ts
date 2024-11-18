import { serve, type Server } from "bun";
import type {
  BoundServer,
  BunServer,
  DSRequest,
  DSResponse,
  GetHandler,
  HandlerTables,
  PostHandler,
  ServerOptions,
  ServerRef,
} from "../types";

let serverRef: null | Server = null;  
const handlerTables: HandlerTables = {
  GET: {},
  POST: {},
};
let origin = null;

export function forwardReq(R: Request, server: BunServer): Response {
  const DSRequest: DSRequest = R;
  const DSResponse: DSResponse = {
    send,
    closed: false,
    response: null,
  };

  let handler;
  if (R.method == "GET" || R.method == "POST") {
    handler = handlerTables[R.method][getRoute(R.url)];
  }
  if (!handler || !handler.length) throw new Error("No request handler provided!");

  for (let i = 0; i < handler.length; i++) {
    handler[i] && handler[i](DSRequest, DSResponse);
  }

  if (!DSResponse.closed || !DSResponse.response) {
    throw new Error("Request connection not closed in handlers.");
  }
  return DSResponse.response;
}

export function createServerRef(options?: ServerOptions): ServerRef {
  const server: BoundServer = {
    get: registerGetRoute,
    post: registerPostRoute,
    listen: initServer(options),
    kill: killSwitch,
  };
  return function () {
    return server;
  };
}

function send(this: DSResponse, ...args: [BodyInit?, ResponseInit?]) {
  if (!args.length) {
    throw new Error("'send' needs Response args.");
  }
  this.closed = true;
  this.response = new Response(...args);
}

function registerGetRoute(route: string, ...handlers: GetHandler[]) {
  if (typeof route !== "string" || !handlers.length)
    throw new Error("GET handler misconfigured.");
  handlerTables.GET[route] = Array.from(handlers);
}

function registerPostRoute(route: string, ...handlers: PostHandler[]) {
  if (typeof route !== "string" || !handlers.length)
    throw new Error("POST handler misconfigured.");
  handlerTables.POST[route] = handlers;
}

function initServer(options?: ServerOptions) {
  return function (port?: number, fn?: () => void) {
    if (typeof options === "object" || options === undefined) {
      serverRef = serve({
        fetch: (R: Request, server: BunServer) => forwardReq(R, server),
        ...options,
        port,
      });
      origin = serverRef.url.origin;
    } else {
      throw new Error("Server options argument invalid.");
    }
    if (typeof fn === "function") fn();
  }
}

function killSwitch() {
  if (!serverRef) throw new Error("No server to kill.");
  else serverRef.stop();
}

function getRoute(url: string) {
  return url.slice(origin.length)
}