/* eslint-disable @typescript-eslint/no-unused-vars */

import { MigrationInterface, QueryRunner, getManager } from 'typeorm';
import User from '../entity/user';
import userSeeds from '../seeds/userSeeds';
import { generatepassword } from '../../../shared/password';

export class UserSeed1604040030380 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getManager().transaction(async trxEntityManager => {
      for (const v of userSeeds) {
        const password = await generatepassword(v.password);
        const user = {
          ...v,
          password: password,
        };
        await trxEntityManager.save(User, user);
      }
    });
  }

  public async down(_: QueryRunner): Promise<void> {
    // do nothing
  }
}
