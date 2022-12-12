import { Send } from "express-serve-static-core";
import { Response } from "express";

export interface IResponse<B> extends Response {
  json: Send<B, this>;
}

export interface IErrorResponse {
  success: boolean;
  error: Error | string;
}

export interface ISuccessResponse<T> {
  success: boolean;
  data: T;
}
