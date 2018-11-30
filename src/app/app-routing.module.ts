import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ClientsComponent } from "./clients/clients.component";
import { ClientAddComponent } from "./client-add/client-add.component";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { ClientDetailsComponent } from "./client-details/client-details.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'client/add', component: RegisterComponent },
  { path: 'client/edit/:id', component: RegisterComponent },
  { path: 'client/:id', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
