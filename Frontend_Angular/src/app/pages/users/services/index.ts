import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environments';

import { API_END_POINTS } from 'src/app/ helper/api.endpoints';
import { IUserListReq, IUserListRes, IUser } from '../../../common/interface/users.interface';
import { IApiResponse } from '../../../common/interface/events.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  // User list api call
  userList(data: IUserListReq) {
    return this.httpClient.post<IApiResponse<IUserListRes>>(
      environment.apiEndpoint + API_END_POINTS.users.list,
      data,
    );
  }

  //  User detail api call
  userDetail(userId: string) {
    return this.httpClient.get<IApiResponse<IUser>>(
      environment.apiEndpoint + API_END_POINTS.users.user + `/${userId}`,
    );
  }

  //   User delete api call
  userDelete(userId: string) {
    return this.httpClient.delete<IApiResponse<object>>(
      environment.apiEndpoint + API_END_POINTS.users.user + `/${userId}`,
    );
  }

  //   User status api call
  userStatus(userId: string) {
    return this.httpClient.get<IApiResponse<object>>(
      environment.apiEndpoint + API_END_POINTS.users.userStatus + `/${userId}`,
    );
  }
}
