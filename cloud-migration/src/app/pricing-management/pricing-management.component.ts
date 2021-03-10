import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pricing } from '../class/pricing';
import { ConfirmationDialogComponent } from '../criteria-management/confirmation-dialog/confirmation-dialog.component';
import { PricingStoreService } from '../services/pricing-store.service';

@Component({
  selector: 'app-pricing-management',
  templateUrl: './pricing-management.component.html',
  styleUrls: ['./pricing-management.component.css']
})
export class PricingManagementComponent implements OnInit, AfterViewInit {
  boolCreate = true;
  status = false;
  panelOpenState = false;
  pageTitle = '';
  formTitle = '';
  displayedColumns = ['category', 'cpu', 'ram', 'pricePerHour', 'pricePerMonth', 'provider', 'action'];
  dataSource = new MatTableDataSource<Pricing>();
  formGroup!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pricingService: PricingStoreService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitle = 'Pricing Management';
    this.geAllPricing();
    this.newPricing();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  geAllPricing(): void {
    this.pricingService.getPricing().then( data => {
      this.dataSource.data = data.pricings;
    })
    .catch(e => {
      console.log(e);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = ( event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newPricing(): void {
   this.formTitle = 'Add new category pricing';
   this.formGroup = this.formBuilder.group({
     category: ['', Validators.required],
     cpu: ['', [Validators.required, Validators.max]],
     ram: ['', [Validators.required, Validators.max]],
     pricePerHour: ['', [Validators.required]],
     pricePerMonth: ['', [Validators.required]],
     provider: ['', [Validators.required]]
   });
  }

  edit(row: Pricing): void {
    this.panelOpenState = true;
    this.formTitle = 'Update Criterion';
    this.formGroup.controls.category.setValue(row.category);
    this.formGroup.controls.provider.setValue(row.provider);
    this.formGroup.controls.cpu.setValue(row.cpu);
    this.formGroup.controls.ram.setValue(row.ram);
    this.formGroup.controls.pricePerHour.setValue(row.pricePerHour);
    this.formGroup.controls.pricePerMonth.setValue(row.pricePerMonth);
    this.status = true;
    this.boolCreate = false;
  }

  delete(provider: string, category: string): void {
    this.deletePricingConfirmation(provider, category);
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const pricing = new Pricing();
    pricing.category = this.f.category.value;
    pricing.cpu = this.f.cpu.value;
    pricing.ram = this.f.ram.value;
    pricing.pricePerHour = this.f.pricePerHour.value;
    pricing.pricePerMonth = this.f.pricePerMonth.value;
    pricing.provider = this.f.provider.value;
    if (this.boolCreate) {
      this.createPricingConfirmation(pricing);
    } else {
      console.log('pricing ', pricing);
      this.updatePricingConfirmation(pricing);
    }
  }

  reset(form: FormGroup): void {
    form.reset();
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  createPricingConfirmation(pricing: Pricing): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
          message: 'Confirm the creation of this new Pricing!?'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.pricingService.setPricing(pricing).then( data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
        this.router.navigate(['']);
      }
    });
  }

  deletePricingConfirmation(provider: string, category: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm to drop this pricing ?'
      },
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.pricingService.deletePricing(provider, category).then( data => {
          console.log(data);
        })
        .catch( e => {
          console.log(e);
        });
        this.router.navigate(['']);
      }
    });
  }

  updatePricingConfirmation(pricing: Pricing): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm tu update this criterion !'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.pricingService.updatePricing(pricing).then( data => {
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
