import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriteriaManagementComponent } from './criteria-management/criteria-management.component';

const routes: Routes = [
  {
    path: 'criteria-management',
    component: CriteriaManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
