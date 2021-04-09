import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriteriaManagementComponent } from './criteria-management/criteria-management.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CriteriaComponent } from './criteria-management/criteria/criteria.component';

import {MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SidenavService } from './services/sidenav.service';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from './criteria-management/confirmation-dialog/confirmation-dialog.component';
import { DetailCriterionComponent } from './criteria-management/detail-criterion/detail-criterion.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
import { RulesManagementComponent } from './rules-management/rules-management.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProvidersManagementComponent } from './providers-management/providers-management.component';
import { AttributsComponent } from './providers-management/attributs/attributs.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { RecoveryMailComponent } from './reset-password/recovery-mail/recovery-mail.component';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';
import { UserManagementComponent } from './user-management/user-management.component';
@NgModule({
  declarations: [
    AppComponent,
    CriteriaManagementComponent,
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
    CriteriaComponent,
    ConfirmationDialogComponent,
    DetailCriterionComponent,
    PricingManagementComponent,
    RulesManagementComponent,
    RegisterComponent,
    LoginComponent,
    ProvidersManagementComponent,
    AttributsComponent,
    ResetPasswordComponent,
    RecoveryMailComponent,
    AlertDialogComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatSliderModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [SidenavService, MatSidenav, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
