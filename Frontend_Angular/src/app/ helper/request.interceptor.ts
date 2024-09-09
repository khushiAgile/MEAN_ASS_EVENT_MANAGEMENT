import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_STORAGE_KEY } from 'src/app/common/constant';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const authData = localStorage.getItem(TOKEN_STORAGE_KEY);

    const newRequest = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${authData}`),
    });
    return next.handle(newRequest);
  }
}
