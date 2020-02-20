import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  usernameInput: string;
  passwordInput: string;
  loginMessage: string;
  idToken: number;
  _acceptedResponses = [
    "Incorrect Username and/or Password!",
    "Please enter a Username and a Password!"
  ];

  constructor(private authService: AuthService, public router: Router) {}

  handleError(error) {
    if (this._acceptedResponses.indexOf(error.error.message) > -1) {
      return error.error.message;
    } else {
      return "Unknown error, please try again later";
    }
  }

  sendLogin() {
    if (this.usernameInput && this.passwordInput) {
      this.authService.login(this.usernameInput, this.passwordInput).subscribe(
        response => {
          localStorage.setItem("access_token", response.accessToken);
          localStorage.setItem("refresh_token", response.refreshToken);
          this.router.navigate([`/nav/rent/`]);
        },
        error => {
          this.loginMessage = this.handleError(error);
        }
      );
    } else {
      this.loginMessage = "Please add a username and a password!";
    }
  }

  navigateRegister() {
    this.router.navigate([`register`]);
  }

  ngOnInit() {}
}
