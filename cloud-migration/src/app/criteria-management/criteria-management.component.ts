import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaStoreService } from '../services/criteria-store.service';
import { MatTableDataSource } from '@angular/material/table';
import { Criteria } from '../class/criteria';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-criteria-management',
  templateUrl: './criteria-management.component.html',
  styleUrls: ['./criteria-management.component.css']
})

export class CriteriaManagementComponent implements OnInit, AfterViewInit {

  pageTitle: string | undefined;
  displayedColumns = ['name', 'vlrate', 'lrate', 'mrate', 'hrate', 'vhrate', 'action'];
  dataSource = new MatTableDataSource<Criteria>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private criterionService: CriteriaStoreService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.pageTitle = 'Criteria Management';
    this.getAllCriteria();
  }


  getAllCriteria(): void {
    this.criterionService.getCriteria().then( data => {
      this.dataSource.data = data.criteres;
    })
    .catch( e => {
      console.log('error');
    });
  }

  applyFilter(event: Event): void {
    const filterValue = ( event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(): void {}

  detail(): void {}

  delete(): void {}
}
