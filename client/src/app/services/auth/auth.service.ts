import { Router } from '@angular/router';
import { LoginResponse } from './../../models/login';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { ICurrentUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username, password): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const options = {
      headers: headers,
      observe: 'response' as 'body'
    };

    const request = this.http.post(`${environment.hostname}/login`,
      {
        'username': `${username}`,
        'password': `${password}`,
      }, options);

    return request.pipe(map(res => {
      return new LoginResponse(res['body'].accessToken, res['body'].refreshToken);
    }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    const currentUser: ICurrentUser = {
      refreshToken: localStorage.getItem('refresh_token'),
      accessToken: localStorage.getItem('access_token')
    };
    const headers = new HttpHeaders({
      'token': currentUser.refreshToken,
    });
    const options = {
      headers: headers,
      observe: 'response' as 'body'
    };
    return this.http.post<ICurrentUser>(`${environment.hostname}/gettoken`, {}, options)
      .pipe(
        map(res => {
          localStorage.setItem('access_token', res['body'].accessToken);
          localStorage.setItem('refresh_token', res['body'].refreshToken);
          currentUser.accessToken = res['body'].accessToken;
          currentUser.refreshToken = res['body'].refreshToken;
          return <ICurrentUser>currentUser;
        }),
        catchError(err => {
          return throwError(err);
        }));
  }
}

