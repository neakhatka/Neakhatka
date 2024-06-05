import { Request, Response, NextFunction } from "express";
import BaseCustomError from "../errors/base-custom-error";
import { StatusCode } from "../utils/consts/status-code";
import { logger } from "../utils/logger";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  logger.error(`Auth Service - errorHandler():  ${err}`);

  if (err instanceof AggregateError) {
    err.errors.forEach((individualError) => {
      logger.error(`AggregateError contains: ${individualError}`);
    });
  }


  // If the error is an instance of our own throw ERROR
  if (err instanceof BaseCustomError) {
    return res.status(err.getStatusCode()).json(err.serializeErrorOutput());
  }

  return res
    .status(StatusCode.InternalServerError)
    //.json({ errors: [{ message: "An unexpected error occurred" }] });
    .json({message:err})
};

export { errorHandler };
