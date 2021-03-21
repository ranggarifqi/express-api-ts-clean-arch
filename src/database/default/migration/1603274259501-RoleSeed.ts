import { getManager, MigrationInterface, QueryRunner } from "typeorm";
import roleSeeds from '../seeds/roleSeeds';
import Role from '../entity/role';

export class RoleSeed1603274259501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getManager().transaction(async (trxEntityManager) => {
      for (const v of roleSeeds) {
        await trxEntityManager.save(Role, v);
      }
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
