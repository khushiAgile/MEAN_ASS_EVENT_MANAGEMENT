export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  password: string;
  email: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}

export interface ILoginRes {
  data: IUser;
  statusCode: number;
  message: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
}

export interface ICommonAuthRes {
  data: object;
  statusCode: number;
  message: string;
}