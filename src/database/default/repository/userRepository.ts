import User from '../entity/user';
import moduleLogger from '../../../shared/logger';
import {
  FindOneOptions,
  FindManyOptions,
  FindConditions,
  Connection,
  Repository,
} from 'typeorm';
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
    return this.findById(id);
  }
}
