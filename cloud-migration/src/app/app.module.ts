import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatIconModule} from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import {FormsModule} from '@angular/forms';
import { CloudCriteriaManagementComponent } from './cloud-criteria-management/cloud-criteria-management.component';
import {MatTableModule} from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';






@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CloudCriteriaManagementComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
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
    MatDialogModule
  
  ],
  providers: [AuthService, ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
