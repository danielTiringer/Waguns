import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StatsComponent } from "./components/stats/stats.component";
import { NotFoundComponent } from "../app/components/not-found/not-found.component";
import { UserInventoryComponent } from './components/userinventory/userinventory.component';
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { AboutComponent } from "./components/about/about.component";

const routes: Routes = [
  { path: '', redirectTo: 'nav/rent', pathMatch: 'full' },
  { path: '#', redirectTo: 'nav/rent', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  {
    path: 'nav',
    component: NavBarComponent,
    children: [
      { path: 'rent', component: UserInventoryComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'about', component: AboutComponent }
    ]
  },
  { path: 'login', component: LoginPageComponent },

  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
