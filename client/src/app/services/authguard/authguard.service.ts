import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}