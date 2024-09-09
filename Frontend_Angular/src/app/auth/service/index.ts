import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICommonAuthRes,
  IForgotPassword,
  ILogin,
  ILoginRes,
  IRegister,
  IResetPassword,
} from '../../common/interface/auth.interface';
import { environment } from 'src/environments/environments';
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from 'src/app/common/constant';
import { API_END_POINTS } from 'src/app/ helper/api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  // check user is login or not
  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  // Check user is admin or not
  isAdmin() {
    const findUserRole = localStorage.getItem(USER_INFO_STORAGE_KEY);
    if (!findUserRole) {
      return false;
    }
    return JSON.parse(findUserRole).role === 'admin';
  }

  // Check user is user or not
  isUser() {
    const findUserRole = localStorage.getItem(USER_INFO_STORAGE_KEY);
    if (!findUserRole) {
      return false;
    }
    return JSON.parse(findUserRole).role === 'user';
  }

  // Logout
  logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_INFO_STORAGE_KEY);
  }

  login(data: ILogin) {
    return this.httpClient.post<ILoginRes>(
      environment.apiEndpoint + API_END_POINTS.auth.login,
      data
    );
  }

  register(data: IRegister) {
    return this.httpClient.post<ICommonAuthRes>(
      environment.apiEndpoint + API_END_POINTS.auth.signup,
      data
    );
  }

  forgot(data: IForgotPassword) {
    return this.httpClient.post<ICommonAuthRes>(
      environment.apiEndpoint + API_END_POINTS.auth.forgotPsw,
      data
    );
  }

  resetPassword(data: IResetPassword) {
    return this.httpClient.post<ICommonAuthRes>(
      environment.apiEndpoint + API_END_POINTS.auth.resetPsw,
      data
    );
  }
}
