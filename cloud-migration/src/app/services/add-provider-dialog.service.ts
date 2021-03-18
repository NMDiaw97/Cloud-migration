import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCloudCriteriaComponent } from '../add-cloud-criteria/add-cloud-criteria.component';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddProviderDialogService {

  constructor(private formBuilder:FormBuilder,private matDialog: MatDialog) { }
  openAddDialog(){
    return this.matDialog.open(AddCloudCriteriaComponent)
    
  }
}