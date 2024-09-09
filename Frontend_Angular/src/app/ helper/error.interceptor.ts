import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, finalize } from 'rxjs';

/**
 * Error Interceptor will check that if any error return in API call.
 * Also Bind token in header when we call API.
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  private activeRequests = 0;
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request) {
      this.activeRequests++;
      this.spinner.show();
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests <= 0) {
          this.activeRequests = 0;
          this.spinner.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error?.error?.message, 'Error');

        if (error.status == 401 || error.status == 403) {
          localStorage.clear();
          this.router.navigateByUrl('/');
        }

        throw error;
      }),
    );
  }
}
