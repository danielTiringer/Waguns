import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { LoginPageComponent } from './components/login-page/login-page.component';


const routes: Routes = [
  {path: 'stats', component: StatsComponent },
  {path: 'login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
