import { Express } from "express";
import UserController from "../../../controllers/userController";
import { DBConnection } from "../../../../database";
import { Server } from "../../../../domain/server";
import { UserRepository } from "../../../../database/default/repository/userRepository";
import { UserUsecase } from "../../../../usecases/userUsecase";
import { jwtAuth, validate } from "../../../middleware";
import { userLoginDto } from "./dto";

export default async function (
  server: Server<Express, DBConnection>,
  basePath: string
) {
  const { app, dbConn } = server;

  const pgConn = await dbConn.getConnection();

  /** We stitch the implementation together here */
  const userRepository = new UserRepository(pgConn);
  const userUsecase = new UserUsecase(userRepository);
  const userController = new UserController(userUsecase);

  app.get(basePath, jwtAuth, userController.findUsers());
  app.post(
    basePath + "/login",
    validate({
      body: userLoginDto,
    }),
    userController.loginUser()
  );
}
