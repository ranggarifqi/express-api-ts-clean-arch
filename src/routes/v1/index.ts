import { Express } from "express";
import { DBConnection } from "../../database";
import { Server } from "../../domain/server";
import createUserRoutes from "./users";

export default function (
  server: Server<Express, DBConnection>,
  basePath: string
) {
  createUserRoutes(server, basePath + "/users");
}
