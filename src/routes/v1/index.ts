import { Express } from "express";
import createUserRoutes from "./users";

export default function (app: Express, basePath: string) {
  createUserRoutes(app, basePath + "/users");
};