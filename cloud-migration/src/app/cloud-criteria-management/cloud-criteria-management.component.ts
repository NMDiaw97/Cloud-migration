import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CloudCriteria } from '../models/cloud-criteria.model';
import { HttpClient } from '@angular/common/http';
import { CloudCriteriaService } from '../services/cloud-criteria.service';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddCloudCriteriaComponent } from '../add-cloud-criteria/add-cloud-criteria.component';
import { AddProviderDialogService } from '../services/add-provider-dialog.service';
import { ConfirmDeleteProviderService } from '../services/confirm-delete-provider.service';




 



@Component({
  selector: 'app-cloud-criteria-management',
  templateUrl: './cloud-criteria-management.component.html',
  styleUrls: ['./cloud-criteria-management.component.css']
})
export class CloudCriteriaManagementComponent implements OnInit {
  
  
  
  displayedColumns = ['name', 'reliability', 'flexibility', 'maturity', 'data_security', 'geolocation','price','actions'];
  element!: CloudCriteria[];
  dataSource = new MatTableDataSource<CloudCriteria>();

  

  constructor(private cloudCriteriaService:CloudCriteriaService,private addDiaolog:AddProviderDialogService, private confirmService:ConfirmDeleteProviderService) { }

  ngOnInit(): void {

    this.getCloudCriteriaList();
  }

  openDialog(){
    this.confirmService.ConfirmDelete()
  }
  addCriteria(){
    this.addDiaolog.openAddDialog()
  }
  
  editProvider(){
  }

  deleteProvider(){

  }
     
   
  
  getCloudCriteriaList():void{

    this.cloudCriteriaService.getCloudCriteriaList().subscribe(data=>{
      this.dataSource.data = data.providers;
      console.log(data.providers)
    

  
    
    })

  }
  //applyFilter(event:Event){
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();    
    
    
  //}

}
