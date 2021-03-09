import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaStoreService } from '../services/criteria-store.service';
import { MatTableDataSource } from '@angular/material/table';
import { Criteria } from '../class/criteria';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatSliderChange} from '@angular/material/slider';
import {BehaviorSubject} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criteria-management',
  templateUrl: './criteria-management.component.html',
  styleUrls: ['./criteria-management.component.css']
})

export class CriteriaManagementComponent implements OnInit, AfterViewInit {
  panelOpenState = false;
  panelOpenStateDetail = false;
  hide = true;
  boolCreate = true;
  detailCriterion = new Criteria();
  status = false;
  formTitle = '';
  pageTitle: string | undefined;
  displayedColumns = ['name', 'vlrate', 'lrate', 'mrate', 'hrate', 'vhrate', 'action'];
  dataSource = new MatTableDataSource<Criteria>();
  formGroup!: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private criterionService: CriteriaStoreService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.pageTitle = 'Criteria Management';
    this.getAllCriteria();
    this.newCriteriaForm();
  }


  getAllCriteria(): void {
    this.criterionService.getCriteria().then( data => {
      this.dataSource.data = data.criteres;
    })
    .catch( e => {
      console.log('error ', e);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = ( event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newCriteriaForm(): void {
   this.formTitle = 'Add new Criterion ';
   this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      vlrate: ['', [Validators.required, Validators.max, Validators.min]],
      lrate: ['', [Validators.required, Validators.max, Validators.min]],
      mrate: ['', [Validators.required, Validators.max, Validators.min]],
      hrate: ['', [Validators.required, Validators.max, Validators.min]],
      vhrate: ['', [Validators.required, Validators.max, Validators.min]],
    });
  }

  edit(row: any): void {
    this.panelOpenState = true;
    this.formTitle = 'Update Criterion ';
    this.formGroup.controls.name.setValue(row.name);
    this.formGroup.controls.vlrate.setValue(row.vlrate);
    this.formGroup.controls.lrate.setValue(row.lrate);
    this.formGroup.controls.mrate.setValue(row.mrate);
    this.formGroup.controls.hrate.setValue(row.hrate);
    this.formGroup.controls.vhrate.setValue(row.vhrate);
    this.status = true;
    this.boolCreate = false;
  }


  detail(row: any): void {
    this.detailCriterion.name = row.name;
    this.detailCriterion.vlrate = row.vlrate;
    this.detailCriterion.lrate = row.lrate;
    this.detailCriterion.mrate = row.mrate;
    this.detailCriterion.hrate = row.hrate;
    this.detailCriterion.vhrate = row.vhrate;
    this.panelOpenStateDetail = true;
  }

  delete(name: string): void {
    this.deleteCriterionConfirmation(name);
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const criterion = new Criteria();
    criterion.name = this.f.name.value;
    criterion.vlrate = this.f.vlrate.value;
    criterion.lrate = this.f.lrate.value;
    criterion.mrate = this.f.mrate.value;
    criterion.hrate = this.f.hrate.value;
    criterion.vhrate = this.f.vhrate.value;
    if (this.boolCreate) {
      this.createCriterionConfirmation(criterion);
    }
    else {
      this.updateCriterionConfirmation(criterion);
    }

  }

  reset(form: FormGroup): void {
    form.reset();
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  createCriterionConfirmation(criterion: Criteria): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
          message: 'Confirm the creation of this new Criterion !?'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.criterionService.setCriteria(criterion).then( data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
        this.router.navigate(['']);
      }
    });
  }

  deleteCriterionConfirmation(name: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm to drop this criterion ?'
      },
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.criterionService.deleteCriteria(name).then( data => {
          console.log(data);
        })
        .catch( e => {
          console.log(e);
        });
        this.router.navigate(['']);
      }
    });
  }

  updateCriterionConfirmation(criterion: Criteria): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm tu update this criterion !'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.criterionService.updateCriteria(criterion).then( data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
        this.router.navigate(['']);
      }
    });
  }
}
