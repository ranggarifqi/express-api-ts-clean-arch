export interface IRegisterUser {
  email: string;
  password: string;
  mobile: string;
  roleId: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginUserResult {
  id: string;
  email: string;
  mobile: string;
  token: string;
  role: string;
}
