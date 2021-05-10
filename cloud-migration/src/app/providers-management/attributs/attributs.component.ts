import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProviderAttribut } from 'src/app/class/provider-attribut';
import { AttributDialogComponent } from 'src/app/dialog/attribut-dialog/attribut-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialog/confirmation-dialog/confirmation-dialog.component';
import { ProviderAttributsService } from 'src/app/services/provider-attributs.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-attributs',
  templateUrl: './attributs.component.html',
  styleUrls: ['./attributs.component.css']
})
export class AttributsComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<ProviderAttribut>();
  displayedColumns = ['name', 'behavior', 'weight', 'percentage', 'action'];
  pageTitle: string | undefined;
  formTitle: string | undefined;
  formGroup!: FormGroup;
  nameformGroup!: FormGroup;
  typeformGroup!: FormGroup;
  ponderationformGroup!: FormGroup;
  boolCreate = true;
  panelOpenState = false;
  status = false;
  spinner = false;
  types!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private attributsService: ProviderAttributsService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllAttributs();
    this.newAttributForm();
    this.pageTitle = 'Attributes'
    this.sharedService.currentData.subscribe(data => {
      console.log('data from attributs ', data);
    });
    this.types = ['benefit', 'cost'];
  }

  getAllAttributs(): void {
    this.attributsService.getAttributes().then(data => {
      this.dataSource.data = data.criteria;
      console.log(data);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newAttributForm(): void {
    this.formTitle = ' Add new Provider attribut ';
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      behavior: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.max, Validators.min]],
    });

    this.nameformGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.typeformGroup = this.formBuilder.group({
      behavior: ['', [Validators.required]],
    })

    this.ponderationformGroup = this.formBuilder.group({
      weight: ['', [Validators.required, Validators.max, Validators.min]],
    })
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  // tslint:disable-next-line:typedef
  getValue(formGroup: FormGroup) {
    return formGroup.controls;
  }

  delete(name: string): void {
    this.deleteAttributConfirmation(name);
  }

  edit(row: ProviderAttribut): void {
    this.panelOpenState = true;
    this.formTitle = `Update Provider Attribut ${row.name}`;
    this.nameformGroup.controls.name.setValue(row.name);
    this.typeformGroup.controls.behavior.setValue(row.behavior);
    this.ponderationformGroup.controls.weight.setValue(row.weight);
    this.status = true;
    this.boolCreate = false;
  }

  reset(form: FormGroup): void {
    form.reset();
  }

  submit(): void {

    const attribut = new ProviderAttribut();
    attribut.name = this.getValue(this.nameformGroup).name.value;
    attribut.behavior = this.getValue(this.typeformGroup).behavior.value;
    attribut.weight = this.getValue(this.ponderationformGroup).weight.value;
    this.showAttribut(attribut);
    this.panelOpenState = false;
  }

  resolveAfter2Seconds(x: unknown) {
    this.spinner = true
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 3000);
    });
  }
  async reload() {
    const val = <number>await this.resolveAfter2Seconds(20);
    if (val) {
      //window.location.reload()
      this.spinner = false;
      this.ngOnInit()
    }
  }
  back(): void {
    this.newAttributForm();
    this.boolCreate = true;
    this.panelOpenState = false;
  }

  createAttributConfirmation(attribut: ProviderAttribut): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm the creation of this new Provider Attribut !?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attributsService.setAttribut(attribut).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
          this.reload().then()
      }
    });
  }

  updateAttributConfirmation(attribut: ProviderAttribut): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm tu update this Provider!'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attributsService.updateAttribut(attribut).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
          this.reload().then()
      }
    });
  }

  deleteAttributConfirmation(name: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm to drop this provider?'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attributsService.deleteAttribut(name).then((data) => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
          this.reload().then()
      }
    });
  }

  showAttribut(row: ProviderAttribut): void {
    const dialogRef = this.dialog.open(AttributDialogComponent, {
      width: '300px',
      maxHeight: '570px',
      data: {
        row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.boolCreate) {
          this.createAttributConfirmation(row);
        } else {
          this.updateAttributConfirmation(row);
        }
      }
    });
  }
}
