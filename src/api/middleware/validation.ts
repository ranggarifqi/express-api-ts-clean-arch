import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { HttpError } from "../../domain/common";
import { errorHandler } from "../helper/errorHandler";

interface Schema {
  body?: ObjectSchema<any>,
  query?: ObjectSchema<any>
}

export const validate = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        console.log('validate body');
        await schema.body.validateAsync(req.body);
      }
  
      if (schema.query) {
        console.log('validate query');
        await schema.query.validate(req.query);
      }

      next();
    } catch (error) {
      return errorHandler(res, new HttpError(400, error.message, 'Validation Error'));
    }
  }
}