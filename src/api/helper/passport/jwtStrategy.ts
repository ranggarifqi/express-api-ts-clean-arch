import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { serverConfig } from "../../../config";
import { DBConnection } from "../../../database";
import { UserRepository } from "../../../database/default/repository/userRepository";

export const createJWTStrategy = async (dbConn: DBConnection): Promise<Strategy> => {

  const pgConn = await dbConn.getConnection();
  const userRepo = new UserRepository(pgConn);

  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: serverConfig.AUTH_TOKEN.SECRET,
  };
  
  return new Strategy(opts, async (jwtPayload, done) => {
    try {
      const user = await userRepo.findById(jwtPayload.id, {
        relations: ["role"]
      });

      if (user) {
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  });
}

