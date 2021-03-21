import { Request, Response } from "express";
import { errorHandler } from "../../lib/errorHandler";
import { DLoginUserDto, DUserUsecase } from "../../domain/users";
import { DSuccessResponse } from "../../domain/common";
import moduleLogger from "../../lib/logger";

const logger = moduleLogger("userController");

export default class UserController {
  private userUsecase: DUserUsecase;

  constructor(userUsecase: DUserUsecase) {
    this.userUsecase = userUsecase;
  }

  findUsers = () => {
    return async (req: Request, res: Response) => {
      logger.info("findUsers");
      try {
        const filter = req.query;
        const users = await this.userUsecase.findUsers(filter);
        const response: DSuccessResponse = {
          statusCode: 200,
          message: "Get user successful",
          results: users,
        };
        return res.send(response);
      } catch (error) {
        logger.error(error);
        return errorHandler(res, error);
      }
    };
  };

  loginUser = () => {
    return async (req: Request, res: Response) => {
      logger.info("loginUser");
      try {
        const body = req.body as DLoginUserDto;

        const loginRes = await this.userUsecase.login(body);

        const response: DSuccessResponse = {
          statusCode: 200,
          message: "Login successful",
          results: loginRes,
        };
        return res.send(response);
      } catch (error) {
        logger.error(error);
        return errorHandler(res, error);
      }
    };
  }
}
