import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private _userId: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public get userId() {
    return this._userId;
  }

}
