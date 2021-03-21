import { Express } from "express";
import { DBConnection } from "../database";
import { Server } from "../domain/server";
import createV1Routes from "./v1";

export default async function (server: Server<Express, DBConnection>, basePath: string) {  
  createV1Routes(server, basePath + "/v1")
};