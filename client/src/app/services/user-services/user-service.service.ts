import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  cancelReservation(carid) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const options = {
      headers: headers,
      observe: 'response' as 'body'
    };

    const body = {
      carId: carid
    }
    const request = this.http.put(`${environment.hostname}/api/cancel`, body, options)
    
    return request.pipe(map(res => {
      return res
    }), catchError(err => {
      return throwError(err);
    }))
  }

  getReservations(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const options = {
      headers: headers
    };

    const request = this.http.get<any>(`${environment.hostname}/api/usersrentals`, options)
    
    return request.pipe(map(res => {
      res.forEach(e => {
        e.rentalTime = e.rentalTime.substring(0, 10);
        e.returnTimeExp = e.returnTimeExp.substring(0,10);
      })
      return res
    }), catchError(err => {
      return throwError(err);
    }))
  }
}
