import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { RegisterResponse } from 'src/app/models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient) { }

  sendRegister (
    email: string, 
    password: string, 
    confirmPsw: string,
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    licenceNumber: string): Observable<RegisterResponse> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      observe: 'response' as 'body'
    };

    const request = this.http.post(`${environment.hostname}/register`,
      {
        'email': email,
        'password': password,
        'confirmPsw': confirmPsw,
        'name': name,
        'phoneNumber': phoneNumber,
        'dateOfBirth': dateOfBirth,
        'licenceNumber': licenceNumber
      }, options);

    return request.pipe(map(res => {
      return new RegisterResponse(res['body']);
    }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
