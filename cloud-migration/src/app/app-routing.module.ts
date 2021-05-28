import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriteriaManagementComponent } from './criteria-management/criteria-management.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RulesManagementComponent } from './rules-management/rules-management.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './security/auth.guard';
import { ProjectComponent } from './project-management/project/project.component';
import { AddCloudCriteriaComponent } from './add-cloud-criteria/add-cloud-criteria.component';
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
  },
  {
    path: 'project',
    component: ProjectComponent
  }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
