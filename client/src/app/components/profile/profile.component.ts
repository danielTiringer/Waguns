import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserServiceService } from "./../../services/user-services/user-service.service";

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
  private _user: User;

  constructor(private http: HttpClient, private userServiceService: UserServiceService) {
    this.userServiceService.getUser().subscribe(data => {
      this._user = data;
    });
  }

  ngOnInit(): void {
  }

  onDelete(rental) {
    console.log('delete');
  }

  public get user() {
    return this._user
  }
}
