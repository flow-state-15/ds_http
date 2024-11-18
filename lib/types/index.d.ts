import { Server } from "bun";

export type BunServer = Server;

export interface DSWebServer {
  createServer: (ServerOptions) => BoundServer;
}

export interface BoundServer {
  get: (string, GetHandler) => void; // queue handler
  post: (string, PostHandler) => void; // queue handler
  listen: Listen; // launches server
  kill: () => void; // kills server
}

export type ServerRef = () => BoundServer;

export interface ServerOptions {
  port?: number;
  development?: boolean;
}

export type GetHandler = (request: DSRequest, Response: DSResponse) => void;
export type PostHandler = (request: DSRequest, Response: DSResponse) => void;
export type Send = (...args: [BodyInit, ResponseInit?]) => void;
export type Listen = (port?: number, callback?: () => void) => void;

export interface HandlerTables {
  "GET": Record<string, GetHandler[]>;
  "POST": Record<string, PostHandler[]>;
}

export interface DSRequest extends Request {
  [key: string]: any | void;
}

export interface DSResponse {
  send: Send;
  closed: boolean;
  response: Response | null;
}

export type InitializationError = {
  any?: any;
} & Error;
