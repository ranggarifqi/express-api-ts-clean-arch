import { UserModel } from "../users";

export class RoleModel {
  id: string;
  name: string;
  description: string;
  users: UserModel[];
}