import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriteriaManagementComponent } from './criteria-management/criteria-management.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RulesManagementComponent } from './rules-management/rules-management.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './security/auth.guard';
import { ProvidersManagementComponent } from './providers-management/providers-management.component';
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
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'pricing-management',
    component: PricingManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rules-management',
    component: RulesManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'providers-management',
    component: ProvidersManagementComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
