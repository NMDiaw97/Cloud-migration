import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CloudCriteriaManagementComponent } from './cloud-criteria-management/cloud-criteria-management.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path : "login", component:LoginComponent},
  {path : "register", component:RegisterComponent},
  {path : "cloud-criteria-manager",component:CloudCriteriaManagementComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
