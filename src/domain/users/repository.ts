import { DUser } from "./model";

export interface DUserRepository {
  find<TOption>(option: TOption): Promise<DUser[]>;
  findById<TOption>(id: string, option?: TOption): Promise<DUser>;
  findOne<TOption>(where?: Dict<any>, option?: TOption): Promise<DUser>;
  create(payload: DUser): Promise<DUser>;
  updateUserById(id: string, payload: Partial<DUser>): Promise<DUser>;
}
