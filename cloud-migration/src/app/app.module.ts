import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriteriaManagementComponent } from './criteria-management/criteria-management.component';
import { HttpClientModule } from '@angular/common/http';
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
import {MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './criteria-management/confirmation-dialog/confirmation-dialog.component';
import { DetailCriterionComponent } from './criteria-management/detail-criterion/detail-criterion.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
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
    PricingManagementComponent
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
    MatDialogModule
  ],
  providers: [SidenavService, MatSidenav],
  bootstrap: [AppComponent]
})
export class AppModule { }
