import { Server } from "bun";

export type BunServer = Server;

export interface DSWebServer {
  createServer: (ServerOptions) => BoundServer;
}

export interface BoundServer {
  get: (string, GetHandler) => undefined; // queue handler
  post: (string, PostHandler) => undefined; // queue handler
  start: () => undefined; // launches server
  kill: () => undefined; // kills server
}

export type ServerRef = () => BoundServer;

export interface ServerOptions {
  port?: number;
}

export type GetHandler = (request: DSRequest, Response: DSResponse) => Undefined;
export type PostHandler = (request: DSRequest, Response: DSResponse) => Undefined;
export type Send = (args: [BodyInit, ResponseInit?]) => Response;

export interface HandlerTables {
  "GET": Record<string, GetHandler>;
  "POST": Record<string, PostHandler>;
}

export interface DSRequest extends Request {
  [key: string]: any | undefined;
}

export interface DSResponse {
  send: Send;
}

export type InitializationError = {
  any?: any;
} & Error;
