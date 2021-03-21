import User from '../entity/user';
import moduleLogger from '../../../shared/functions/logger';
import {
  FindOneOptions,
  getRepository,
  FindManyOptions,
  FindConditions,
  Connection,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DUserRepository } from '../../../domain/users';

const logger = moduleLogger('userRepository');

export class UserRepository implements DUserRepository {
  private repository: Repository<User>;

  constructor(pgsqlConn: Connection) {
    this.repository = pgsqlConn.getRepository(User);
  }

  async find(option: FindManyOptions<User>): Promise<User[]> {
    logger.info('Find users');
    const user = await this.repository.find(option);
    return user;
  }

  async findById(id: string, option?: FindOneOptions<User>): Promise<User> {
    logger.info('Find user by id');
    const user = await this.repository.findOne(id, option);
    return user;
  }

  async findOne(where?: FindConditions<User>, opts?: FindOneOptions<User>): Promise<User> {
    logger.info('Find one user');
    const user = await this.repository.findOne(where, opts);
    return user;
  }

  async create(payload: User): Promise<User> {
    logger.info('Create User');
    const newUser = await this.repository.save(payload);
    return newUser;
  }

  async updateUserById(id: string, payload: Partial<User>): Promise<User> {
    logger.info('Update user by id');
    await this.repository.update(id, payload);
    return findById(id);
  }
}

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