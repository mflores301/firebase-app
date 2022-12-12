import { ParamsDictionary, Query } from "express-serve-static-core";
import { Request } from "express";

export interface IRequest<P extends ParamsDictionary, Q extends Query, B>
  extends Request {
  params: P;
  query: Q;
  body: B;
}
