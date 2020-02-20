import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  handleError() {
    this.router.navigate([`/nav/rent`]);
  }

  getUser(): Observable<any> {
    const request = this.http.get(`${environment.hostname}/api/user`);
    return request.pipe(map(res => {
      return (res);
    }),
      catchError(err => {
        return throwError(this.handleError());
      })
    );
  }
}
