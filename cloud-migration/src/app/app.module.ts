import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './auth.service';
import {FormsModule} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component'
import { CloudCriteriaManagementComponent } from './cloud-criteria-management/cloud-criteria-management.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmationDialogComponent } from './criteria-management/confirmation-dialog/confirmation-dialog.component';
import { DetailCriterionComponent } from './criteria-management/detail-criterion/detail-criterion.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatTableModule} from '@angular/material/table';
import { AuthGuard } from './auth.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CloudCriteriaManagementComponent,
    SidebarComponent,
    ToolbarComponent,
    CriteriaComponent,
    ConfirmationDialogComponent,
    DetailCriterionComponent,
    PricingManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatExpansionModule,
    MatSliderModule,
    MatDialogModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
