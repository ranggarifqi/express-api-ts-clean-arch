import { RoleModel } from "../roles";

export class UserModel {
  id: string;
  email: string;
  mobile: string;
  password: string;
  isActive: boolean;
  roleId: string;
  role: RoleModel;
}