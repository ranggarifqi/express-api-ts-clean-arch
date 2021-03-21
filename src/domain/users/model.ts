import { DRole } from "../roles";

export class DUser {
  id: string;
  email: string;
  mobile: string;
  password: string;
  isActive: boolean;
  roleId: string;
  role: DRole;
}

export interface DRegisterUserDto {
  email: string;
  password: string;
  mobile: string;
  roleId: string;
}

export interface DLoginUserDto {
  email: string;
  password: string;
}

export interface DLoginUserResult {
  id: string;
  email: string;
  mobile: string;
  token: string;
  role: string;
}