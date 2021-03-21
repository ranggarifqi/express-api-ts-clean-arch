import { Express } from "express";
import { DBConnection } from "../../../database";
import { Server } from "../../../domain/server";
import createUserRoutes from "./users";

export default async function (
  server: Server<Express, DBConnection>,
  basePath: string
) {
  await createUserRoutes(server, basePath + "/users");
}
