import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CloudCriteria } from '../models/cloud-criteria.model';
import { HttpClient } from '@angular/common/http';
import { CloudCriteriaService } from '../services/cloud-criteria.service';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';




 



@Component({
  selector: 'app-cloud-criteria-management',
  templateUrl: './cloud-criteria-management.component.html',
  styleUrls: ['./cloud-criteria-management.component.css']
})
export class CloudCriteriaManagementComponent implements OnInit {
  
  
  
  displayedColumns = ['name', 'reliability', 'flexibility', 'maturity', 'data_security', 'geolocation','price','actions'];
  element!: CloudCriteria[];
  dataSource = new MatTableDataSource<CloudCriteria>();
  

  constructor(private cloudCriteriaService:CloudCriteriaService,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.getCloudCriteriaList();
  }

  openDialog(){
    this.dialog.open(ConfirmDialogComponent)
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
