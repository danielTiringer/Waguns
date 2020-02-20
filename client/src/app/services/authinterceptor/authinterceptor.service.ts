import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { ICurrentUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})


export class AuthinterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | any> {

    const accessToken = localStorage.getItem('access_token');

    return next.handle(this.addTokenToRequest(req, accessToken))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 403:
                return this.handle403Error(req, next);
              case 401:
                return <any>this.auth.logout();
              default:
                return throwError(err);
            }
          } else {
            return throwError(err);
          }
        })
      );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.auth.refreshToken()
        .pipe(
          switchMap((user: ICurrentUser) => {
            if (user) {
              this.tokenSubject.next(user.accessToken);
              localStorage.setItem('access_token', user.accessToken);
              return next.handle(this.addTokenToRequest(request, user.accessToken));
            }
            return <any>this.auth.logout();
          }),
          catchError(err => {
            return <any>this.auth.logout();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else if (request.url.search('gettoken') !== -1) {
      this.isRefreshingToken = false;
      return this.auth.logout();
    } else {
      this.isRefreshingToken = false;
      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }
}