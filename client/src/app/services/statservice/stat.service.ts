import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Popular } from 'src/app/models/stat';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  handleError(err) {
    console.log(err)
  }

  getAdminMetrics(type:string):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = {
      headers: headers,
    };
    const request = this.http.get<any>(`${environment.hostname}/api/metrics/${type}`, options)

    switch (type) {
      case 'popular':
        return request.pipe(map(res => {
          let lists = {
            makes: [],
            counts: []
          };
          res.forEach(e => {
            lists.makes.push(e.make)
            lists.counts.push(e.count)
          })
          return lists;
        }),
          catchError(err => {
            return throwError(this.handleError(err));
          })
        )
      case 'footprint':
        return request.pipe(map(res => {
          return {
            months: Object.keys(res),
            emissions: Object.values(res),
          };
        }),
          catchError(err => {
            return throwError(this.handleError(err));
          })
        )
    }
  }
}
