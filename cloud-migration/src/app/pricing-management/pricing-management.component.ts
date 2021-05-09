import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pricing } from '../class/pricing';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
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

  categoryformGroup!: FormGroup;
  cpuformGroup!: FormGroup;
  ramformGroup!: FormGroup;
  pricePerHourformGroup!: FormGroup;
  pricePerMonthformGroup!: FormGroup;
  providerformGroup!: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pricingService: PricingStoreService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitle = 'Pricing';
    this.geAllPricing();
    this.newPricing();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  geAllPricing(): void {
    this.pricingService.getPricing().then(data => {
      this.dataSource.data = data.pricings;
    })
      .catch(e => {
        console.log(e);
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newPricing(): void {
    this.formTitle = 'Add new category pricing';

    this.categoryformGroup = this.formBuilder.group({
      category: ['', [Validators.required]]
    });

    this.cpuformGroup = this.formBuilder.group({
      cpu: ['', [Validators.required]]
    })

    this.ramformGroup = this.formBuilder.group({
      ram: ['', [Validators.required]]
    })

    this.pricePerHourformGroup = this.formBuilder.group({
      pricePerHour: ['', [Validators.required]]
    })

    this.pricePerMonthformGroup = this.formBuilder.group({
      pricePerMonth: ['', [Validators.required]]
    })

    this.providerformGroup = this.formBuilder.group({
      provider: ['', [Validators.required]]
    })

   
  }

  edit(row: Pricing): void {
    this.panelOpenState = true;
    this.formTitle = 'Update Criterion';
    this.getValue(this.categoryformGroup).category.setValue(row.category);
    this.getValue(this.cpuformGroup).cpu.setValue(row.cpu);
    this.getValue(this.ramformGroup).ram.setValue(row.ram);
    this.getValue(this.pricePerHourformGroup).pricePerHour.setValue(row.pricePerHour);
    this.getValue(this.pricePerMonthformGroup).pricePerMonth.setValue(row.pricePerMonth);
    this.getValue(this.providerformGroup).provider.setValue(row.provider);
    this.status = true;
    this.boolCreate = false;
  }

  delete(provider: string, category: string): void {
    this.deletePricingConfirmation(provider, category);
  }

   // tslint:disable-next-line:typedef
   getValue(formGroup: FormGroup) {
    return formGroup.controls;
  }

  submit(): void {
    const pricing = new Pricing();
    pricing.category = this.categoryformGroup.controls.category.value;
    pricing.ram = this.ramformGroup.controls.ram.value;
    pricing.cpu = this.cpuformGroup.controls.cpu.value;
    pricing.pricePerHour = this.pricePerHourformGroup.controls.pricePerHour.value;
    pricing.pricePerMonth = this.pricePerMonthformGroup.controls.pricePerMonth.value;
    pricing.provider = this.providerformGroup.controls.provider.value;

    console.log(pricing);
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

  createPricingConfirmation(pricing: Pricing): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm the creation of this new Pricing!?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pricingService.setPricing(pricing).then(data => {
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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pricingService.deletePricing(provider, category).then(data => {
          console.log(data);
        })
          .catch(e => {
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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pricingService.updatePricing(pricing).then(data => {
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
