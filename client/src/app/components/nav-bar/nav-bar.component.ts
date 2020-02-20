import { User } from './../../models/user';
import { UserServiceService } from "./../../services/user-services/user-service.service";
import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  private _user: User;
  auth: AuthService;

  constructor(
    auth: AuthService,
    private userServiceService: UserServiceService
  ) {
    this.userServiceService.getUser().subscribe(data => {
      this._user = data;
    });
    this.auth = auth;
  }

  ngOnInit(): void {
  }

  public get user() {
    return this._user
  }
}
