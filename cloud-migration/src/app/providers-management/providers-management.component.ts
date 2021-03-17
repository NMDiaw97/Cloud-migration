import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Provider } from '../class/provider';
import { ConfirmationDialogComponent } from '../criteria-management/confirmation-dialog/confirmation-dialog.component';
import { ProvidersService } from '../services/providers.service';
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
  formGroup!: FormGroup;
  boolCreate = true;
  panelOpenState = false;
  status = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private providersService: ProvidersService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllProvider();
    this.newProviderForm();
  }

  getAllProvider(): void {
    this.providersService.getProviders().then( data => {
      this.dataSource.data = data.providers;
      console.log(data.providers);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = ( event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newProviderForm(): void {
    this.formTitle = ' Add new Provider ';
    this.formGroup = this.formBuilder.group({

      name: ['', Validators.required],
      reliability: ['', [Validators.required, Validators.max, Validators.min]],
      flexibility: ['', [Validators.required, Validators.max, Validators.min]],
      maturity: ['', [Validators.required, Validators.max, Validators.min]],
      datasecurity: ['', [Validators.required, Validators.max, Validators.min]],
      geodispatching: ['', [Validators.required, Validators.max, Validators.min]],
      price: ['', [Validators.required, Validators.max, Validators.min]]

    });
  }

  edit(row: any): void {

    this.panelOpenState = true;
    this.formTitle = `Update Provider ${row.name}`;
    this.f.name.setValue(row.name);
    this.f.reliability.setValue(row.reliability);
    this.f.flexibility.setValue(row.flexibility);
    this.f.maturity.setValue(row.maturity);
    this.f.datasecurity.setValue(row.datasecurity);
    this.f.geodispatching.setValue(row.geodispatching);
    this.f.price.setValue(row.price);
    this.status = true;
    this.boolCreate = false;
  }

  delete(name: string): void {
    this.deleteProviderConfirmation(name);
  }

  reset(form: FormGroup): void {
    form.reset();
  }

    // tslint:disable-next-line:typedef[]
    get f() {
      return this.formGroup.controls;
    }

    submit(): void {
      if (this.formGroup.invalid) {
        return;
      }

      const provider = new Provider();
      provider.name = this.f.name.value;
      provider.reliability = this.f.reliability.value;
      provider.flexibility = this.f.flexibility.value;
      provider.maturity = this.f.maturity.value;
      provider.datasecurity = this.f.datasecurity.value;
      provider.geodispatching = this.f.geodispatching.value;
      provider.price = this.f.price.value;
      if (this.boolCreate) {
        this.createProviderConfirmation(provider);
      }
      else {
        console.log(provider);
        this.updateProviderConfirmation(provider);
      }
    }

    createProviderConfirmation(provider: Provider): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '200px',
        data: {
            message: 'Confirm the creation of this new Provider !?'
        }
      });
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.providersService.setProvider(provider).then( data => {
            console.log(data);
          })
          .catch(e => {
            console.log(e);
          });
          this.router.navigate(['']);
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
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.providersService.updateProvider(provider).then( data => {
            console.log(data);
          })
          .catch(e => {
            console.log(e);
          });
          this.router.navigate(['']);
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
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.providersService.deleteProvider(name).then( data => {
            console.log(data);
          })
          .catch( e => {
            console.log(e);
          });
          this.router.navigate(['']);
        }
      });
    }

    back(): void {
      this.newProviderForm();
      this.boolCreate = true;
      this.panelOpenState = false;
    }
}
