import {
  DLoginUserDto,
  DLoginUserResult,
  DRegisterUserDto,
  DUser,
} from "./model";

export interface DUserUsecase {
  findUsers<TOption>(opt: TOption): Promise<DUser[]>;
  findUserById<TOption>(id: string, opt: TOption): Promise<DUser>;
  registerUser(payload: DRegisterUserDto): Promise<DUser>;
  login(payload: DLoginUserDto): Promise<DLoginUserResult>;
}
