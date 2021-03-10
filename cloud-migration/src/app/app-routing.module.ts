import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriteriaManagementComponent } from './criteria-management/criteria-management.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RulesManagementComponent } from './rules-management/rules-management.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './security/auth.guard';
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent

  },
  {
    path: 'criteria-management',
    component: CriteriaManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'pricing-management',
    component: PricingManagementComponent
  },
  {
    path: '',
    component: SidebarComponent
  },
  {
    path: 'rules-management',
    component: RulesManagementComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
