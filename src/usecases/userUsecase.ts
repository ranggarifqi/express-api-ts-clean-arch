import * as jwt from "jsonwebtoken";

import { IRegisterUser, ILoginUser, ILoginUserResult } from '../shared/interfaces/user';
import User from '../database/default/entity/user';
import { generatepassword } from '../shared/functions';
import * as userRepository from '../database/default/repository/userRepository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { HttpError } from '../shared/classes/HttpError';
import { comparepassword } from '../shared/functions/commons';
import { serverConfig } from '../config/server';

export const findUsers = async (opts: FindManyOptions<User>): Promise<User[]> => {
  return userRepository.find(opts);
};

export const findUserById = async (userId: string, opts?: FindOneOptions<User>) => {
  return userRepository.findById(userId, opts);
};

export const registerUser = async (payload: IRegisterUser): Promise<User> => {
  const newUser = new User();
  newUser.email = payload.email;
  newUser.mobile = payload.mobile;
  newUser.password = await generatepassword(payload.password);
  newUser.roleId = payload.roleId;

  return userRepository.create(newUser);
};

export const login = async (payload: ILoginUser): Promise<ILoginUserResult> => {
  const user = await userRepository.findOne({
    email: payload.email
  }, {
    select: ["id", "email", "mobile", "active", "password"],
    relations: ["role"]
  });
  if (!user) {
    throw new HttpError(401, "Incorrect email or password");
  }

  const correctPass = await comparepassword(payload.password, user.password);

  if (!correctPass) {
    throw new HttpError(401, "Incorrect email or password");
  }

  if (!user.active) {
    throw new HttpError(403, "Inactive user");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role.name
  };
  
  const token = jwt.sign(jwtPayload, serverConfig.AUTH_TOKEN.SECRET, {
    expiresIn: serverConfig.AUTH_TOKEN.EXPIRE_HRS + 'h'
  });

  return {
    id: user.id,
    email: user.email,
    mobile: user.mobile,
    role: user.role.name,
    token
  };
};