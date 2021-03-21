import * as jwt from "jsonwebtoken";

import User from "../database/default/entity/user";
import { generatepassword } from "../shared/functions";
import { FindConditions, FindManyOptions, FindOneOptions } from "typeorm";
import { HttpError } from "../shared/classes/HttpError";
import { comparepassword } from "../shared/functions/commons";
import { serverConfig } from "../config/server";
import {
  DLoginUserDto,
  DLoginUserResult,
  DRegisterUserDto,
  DUser,
  DUserRepository,
  DUserUsecase,
} from "../domain/users";
import moduleLogger from "../shared/functions/logger";

const logger = moduleLogger("userUsecase");

export class UserUsecase implements DUserUsecase {
  private userRepository: DUserRepository;

  constructor(userRepository: DUserRepository) {
    this.userRepository = userRepository;
  }

  async findUsers(opt: FindManyOptions<User>): Promise<DUser[]> {
    logger.info("findUsers");
    return this.userRepository.find(opt);
  }

  async findUserById(id: string, opt: FindOneOptions<User>): Promise<DUser> {
    logger.info("findUserById");
    return this.userRepository.findById(id, opt);
  }

  async registerUser(payload: DRegisterUserDto): Promise<DUser> {
    logger.info("registerUser");
    const newUser = new User();
    newUser.email = payload.email;
    newUser.mobile = payload.mobile;
    newUser.password = await generatepassword(payload.password);
    newUser.roleId = payload.roleId;

    return this.userRepository.create(newUser);
  }

  async login(payload: DLoginUserDto): Promise<DLoginUserResult> {
    logger.info("login");

    const user = await this.userRepository.findOne<
      FindConditions<User>,
      FindOneOptions<User>
    >(
      {
        email: payload.email,
      },
      {
        select: ["id", "email", "mobile", "isActive", "password"],
        relations: ["role"],
      }
    );
    if (!user) {
      throw new HttpError(401, "Incorrect email or password");
    }

    const correctPass = await comparepassword(payload.password, user.password);

    if (!correctPass) {
      throw new HttpError(401, "Incorrect email or password");
    }

    if (!user.isActive) {
      throw new HttpError(403, "Inactive user");
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
    };

    const token = jwt.sign(jwtPayload, serverConfig.AUTH_TOKEN.SECRET, {
      expiresIn: serverConfig.AUTH_TOKEN.EXPIRE_HRS + "h",
    });

    return {
      id: user.id,
      email: user.email,
      mobile: user.mobile,
      role: user.role.name,
      token,
    };
  }
}
