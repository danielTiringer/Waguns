import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = this.http.get<User>('http://localhost:3000/api/user', httpOptions);
  }

  onDelete(rental) {
    console.log('delete');
  }
}
