import User from '../entity/user';
import moduleLogger from '../../../shared/functions/logger';
import {
  FindOneOptions,
  getRepository,
  FindManyOptions,
  FindConditions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

const logger = moduleLogger('userRepository');

export const find = async (opts: FindManyOptions<User>): Promise<User[]> => {
  logger.info('Find users');
  const userRepository = getRepository(User);
  const user = await userRepository.find(opts);
  return user;
};

export const findById = async (userId: string, opts?: FindOneOptions<User>): Promise<User> => {
  logger.info('Find user by id');
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId, opts);
  return user;
};

export const findOne = async (where?: FindConditions<User>, opts?: FindOneOptions<User>): Promise<User> => {
  logger.info('Find one user');
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(where, opts);
  return user;
};

export const create = async (payload: User): Promise<User> => {
  logger.info('Create User');
  const userRepository = getRepository(User);
  const newUser = await userRepository.save(payload);
  return newUser;
};

export const updateUserById = async (userId: string, payload: QueryDeepPartialEntity<User>): Promise<User> => {
  logger.info('Update user by id');
  const userRepository = getRepository(User);
  await userRepository.update(userId, payload);
  return findById(userId);
};