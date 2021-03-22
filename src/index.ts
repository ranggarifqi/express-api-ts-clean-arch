import express, { Express } from "express";
import * as dotenv from "dotenv";
import passport from "passport";

import { serverConfig } from "./config";
import createRoutes from "./api/routes";
import { DBConnection } from "./database/index";
import { Server } from "./domain/server";
import { createJWTStrategy } from "./api/helper/passport/jwtStrategy";

dotenv.config();

const init = async () => {
  const app = express();

  /** Create all DB Instances */
  const dbConnection = new DBConnection();
  await dbConnection.createInstance();

  /** Global Middleware */
  app.use(express.json());

  /** Passport */
  passport.use(await createJWTStrategy(dbConnection));

  app.get("/", (req, res) => {
    return res.send("Hello World");
  });

  /** Construct Server Object */
  const server: Server<Express, DBConnection> = {
    app,
    dbConn: dbConnection,
  };

  /** Create routes */
  await createRoutes(server, "/api");

  app.get("*", (req, res) => {
    return res.send("Error 404: Page Not Found");
  });

  app.listen(serverConfig.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at https://localhost:${serverConfig.PORT}`
    );
  });
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
