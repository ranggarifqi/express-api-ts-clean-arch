import { DUser } from "../users";

export class DRole {
  id: string;
  name: string;
  description: string;
  users: DUser[];
}