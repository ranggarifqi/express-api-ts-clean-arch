import { Response } from "express";
import { HttpError } from '../classes/HttpError';
import { IErrorResponse } from '../interfaces/response';

export const errorHandler = (res: Response, err: any) => {
  if (err instanceof HttpError) {
    return res.status(err.status).send({
      error: err.name,
      statusCode: err.status,
      message: err.message
    } as IErrorResponse);
  }

  return res.status(500).send({
    statusCode: 500,
    error: "Internal server error",
    message: err.message
  } as IErrorResponse);
}