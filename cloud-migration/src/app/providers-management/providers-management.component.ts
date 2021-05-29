import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Provider } from '../class/provider';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { ProvidersService } from '../services/providers.service';
import { SharedService } from '../services/shared.service';
import { ProviderDialogComponent } from '../dialog/provider-dialog/provider-dialog.component';
@Component({
  selector: 'app-providers-management',
  templateUrl: './providers-management.component.html',
  styleUrls: ['./providers-management.component.css']
})
export class ProvidersManagementComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Provider>();
  displayedColumns = ['name', 'reliability', 'flexibility', 'maturity', 'dataSecurity', 'geoDispatching', 'price', 'action'];
  pageTitle: string | undefined;
  formTitle: string | undefined;
  spinner = false;
  value = 0;
  nameformGroup!: FormGroup;
  relaibilityformGroup!: FormGroup;
  flexibilityformGroup!: FormGroup;
  maturityformGroup!: FormGroup;
  dataSecformGroup!: FormGroup;
  geodispformGroup!: FormGroup;
  priceformGroup!: FormGroup;

  boolCreate = true;
  panelOpenState = false;
  attributsNames: string[] = [];
  status = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private providersService: ProvidersService,
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
    this.pageTitle = 'Providers'
    this.getAllProvider();
    this.newProviderForm();
    this.sharedNames();
  }

  getAllProvider(): void {
    this.providersService.getProviders().then(data => {
      this.dataSource.data = data.providers;
      data.providers.forEach((item: Provider) => this.attributsNames.push(item.name));
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newProviderForm(): void {
    this.formTitle = ' Add new Provider ';

    this.nameformGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.relaibilityformGroup = this.formBuilder.group({
      relaibility: ['', [Validators.required, Validators.max, Validators.min]]
    });

    this.flexibilityformGroup = this.formBuilder.group({
      flexibility: ['', [Validators.required, Validators.max, Validators.min]]
    });

    this.maturityformGroup = this.formBuilder.group({
      maturity: ['', [Validators.required, Validators.max, Validators.min]]
    });

    this.dataSecformGroup = this.formBuilder.group({
      datasecurity: ['', [Validators.required, Validators.max, Validators.min]]
    });

    this.geodispformGroup = this.formBuilder.group({
      geodispatching: ['', [Validators.required, Validators.max, Validators.min]]
    });

    this.priceformGroup = this.formBuilder.group({
      price: ['', [Validators.required, Validators.max, Validators.min]]
    });
  }

  edit(row: Provider): void {
    this.boolCreate = false;
    this.panelOpenState = true;
    this.formTitle = `Update Provider ${row.name}`;
    this.nameformGroup.controls.name.setValue(row.name);
    this.relaibilityformGroup.controls.relaibility.setValue(row.reliability);
    this.flexibilityformGroup.controls.flexibility.setValue(row.flexibility);
    this.maturityformGroup.controls.maturity.setValue(row.maturity);
    this.dataSecformGroup.controls.datasecurity.setValue(row.datasecurity);
    this.geodispformGroup.controls.geodispatching.setValue(row.geodispatching);
    this.priceformGroup.controls.price.setValue(row.price);
  }

  delete(name: string): void {
    this.deleteProviderConfirmation(name);
  }

  // tslint:disable-next-line:typedef
  getValue(formGroup: FormGroup) {
    return formGroup.controls;
  }

  submit(): void {
    const provider = new Provider();
    provider.name = this.getValue(this.nameformGroup).name.value;
    provider.reliability = this.getValue(this.relaibilityformGroup).relaibility.value;
    provider.flexibility = this.getValue(this.flexibilityformGroup).flexibility.value;
    provider.maturity = this.getValue(this.maturityformGroup).maturity.value;
    provider.datasecurity = this.getValue(this.dataSecformGroup).datasecurity.value;
    provider.geodispatching = this.getValue(this.geodispformGroup).geodispatching.value;
    provider.price = this.getValue(this.priceformGroup).price.value;
    this.showProvider(provider);
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

  createProviderConfirmation(provider: Provider): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm the creation of this new Provider !?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providersService.setProvider(provider).then(data => {
          console.log(data);

        })
          .catch(e => {
            console.log(e);
          });
        this.reload().then()
      }
    });
  }

  updateProviderConfirmation(provider: Provider): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm tu update this Provider!'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providersService.updateProvider(provider).then(data => {
          console.log(data);

        })
          .catch(e => {
            console.log(e);
          });
        this.reload().then()
      }
    });
  }


  deleteProviderConfirmation(name: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm to drop this provider?'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providersService.deleteProvider(name).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
        this.reload().then()
      }
    });
  }

  showProvider(row: Provider): void {
    const dialogRef = this.dialog.open(ProviderDialogComponent, {
      width: '300px',
      height: '570px',
      data: {
        row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.boolCreate) {
          this.createProviderConfirmation(row);
        } else {
          this.updateProviderConfirmation(row);
        }
      }
    });
  }



  back(): void {
    this.newProviderForm();
    this.boolCreate = true;
    this.panelOpenState = false;
  }

  sharedNames(): void {
    this.sharedService.changeData(this.attributsNames);
  }

}
