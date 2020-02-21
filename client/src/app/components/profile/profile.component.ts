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
  resData: any; //sorry about this being an <any>, but this whole service was done in the last 30 minutes and I didn't have time to make a new model

  constructor(private http: HttpClient, private userServiceService: UserServiceService) {
    this.userServiceService.getUser().subscribe(data => {
      this._user = data;
    });
    this.getRes()
  }

  ngOnInit(): void {
  }

  getRes() {
    this.userServiceService.getReservations().subscribe(data => {
      this.resData = data;
    })
  }

  onDelete(carId) {
    this.userServiceService.cancelReservation(carId).subscribe(res => {
      this.getRes();
    }, err => {
      console.log(err);
    })
  }

  public get user() {
    return this._user
  }
}
