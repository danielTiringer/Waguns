import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthinterceptorService } from "./services/authinterceptor/authinterceptor.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StatsComponent } from "./components/stats/stats.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AboutComponent } from "./components/about/about.component";
import { UserInventoryComponent } from "./components/userinventory/userinventory.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { EarnComponent } from "./components/earn/earn.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { Stats3Component } from './components/stats3/stats3.component';
import { RegisterComponent } from './components/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    LoginPageComponent,
    NavBarComponent,
    NotFoundComponent,
    AboutComponent,
    UserInventoryComponent,
    AboutComponent,
    ProfileComponent,
    EarnComponent,
    Stats3Component,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    NgApexchartsModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
