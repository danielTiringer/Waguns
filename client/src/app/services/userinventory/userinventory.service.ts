import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Car } from 'src/app/models/car';

@Injectable({
  providedIn: 'root'
})
export class UserinventoryService {
  router: any;

  constructor(private http: HttpClient) { }

  handleError(err) {
    console.log(err)
  }

  getInventory() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = {
      headers: headers
    };

    const request = this.http.get<any>(`${environment.hostname}/api/available`, options);
    return request.pipe(map(res => {
      let list: Car[] = [];
      res.forEach(e => {
        list.push(new Car(e))
      });
      return list;
    }),
      catchError(err => {
        return throwError(this.handleError(err));
      })
    );
  }

  sendBooking(id:number, startDate:Date, endDate:Date) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = {
      headers: headers,
      observe: 'response' as 'body'
    };
    let body = {
      carId: id,
      rentalTime: startDate,
      returnTimeExp: endDate,
    }
    const request = this.http.post<any>(`${environment.hostname}/api/rent`, body, options)

    return request.pipe(map(res => {
      return res
    }),
      catchError(err => {
        return throwError(this.handleError(err));
      })
    )
  }
}
