import { Express } from "express";
import UserController from "./userController";
// import { filterSchema, userLoginDto } from "../../../shared/dtos";
import { DBConnection } from "../../../database";
import { Server } from "../../../domain/server";
import { UserRepository } from "../../../database/default/repository/userRepository";
import { UserUsecase } from "../../../usecases/userUsecase";

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

  app.get(basePath, userController.findUsers());
  app.post(basePath + "/login", userController.loginUser());

  // server.route({
  //   method: "GET",
  //   path: basePath,
  //   handler: userController.findUser,
  //   options: {
  //     auth: 'jwt',
  //     description: 'Get users with filter',
  //     notes: 'Get all users if filter is not specified.',
  //     tags: ['api', 'user'],
  //     validate: {
  //       query: filterSchema
  //     },
  //   }
  // });

  // server.route({
  //   method: "POST",
  //   path: basePath + "/login",
  //   handler: userController.loginUser,
  //   options: {
  //     description: 'Login user',
  //     notes: 'Login user by email & password',
  //     tags: ['api', 'user'],
  //     validate: {
  //       payload: userLoginDto
  //     }
  //   }
  // });
}
