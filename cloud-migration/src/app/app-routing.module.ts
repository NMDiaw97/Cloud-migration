import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CloudCriteriaManagementComponent } from './cloud-criteria-management/cloud-criteria-management.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { CriteriaManagementComponent } from './criteria-management/criteria-management.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path : "login", component:LoginComponent},
  {path : "register", component:RegisterComponent},
  {path : "cloud-criteria-manager",component:CloudCriteriaManagementComponent,canActivate:[AuthGuard]},
  { path: 'criteria-management',component: CriteriaManagementComponent},
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
