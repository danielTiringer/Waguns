import { EarnComponent } from './components/earn/earn.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { NotFoundComponent } from '../app/components/not-found/not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AboutComponent } from './components/about/about.component';
import { UserInventoryComponent } from './components/userinventory/userinventory.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Stats3Component } from './components/stats3/stats3.component';
import { AuthguardService } from './services/authguard/authguard.service';
import { RegisterComponent } from './components/register-page/register-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'nav/rent', pathMatch: 'full' },
  { path: '#', redirectTo: 'nav/rent', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  {
    path: 'nav',
    component: NavBarComponent,
    canActivate: [AuthguardService],
    children: [
      { path: 'rent', component: UserInventoryComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'earn', component: EarnComponent },
      { path: 'stats3', component: Stats3Component },
      { path: 'about', component: AboutComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
