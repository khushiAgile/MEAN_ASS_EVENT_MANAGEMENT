export interface IUserListReq {
  offset: number;
  limit: number;
  search?: string;
}

export interface IUserListRes {
  result: IUser[];
  recordsTotal: number;
  recordsFiltered: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
