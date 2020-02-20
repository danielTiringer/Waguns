import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StatsComponent } from "./components/stats/stats.component";
import { NotFoundComponent } from "../app/components/not-found/not-found.component";
import { ReeentACarComponent } from "../app/components/reeent-a-car/reeent-a-car.component";
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "404", component: NotFoundComponent },
  {
    path: "car-hall",
    component: ReeentACarComponent
  },
  { path: "stats", component: StatsComponent },
  {path: 'login', component: LoginPageComponent},
  { path: "**", redirectTo: "/404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
