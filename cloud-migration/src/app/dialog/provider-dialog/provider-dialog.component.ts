import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provider } from 'src/app/class/provider';

@Component({
  selector: 'app-provider-dialog',
  templateUrl: './provider-dialog.component.html',
  styleUrls: ['./provider-dialog.component.css']
})
export class ProviderDialogComponent implements OnInit {

  nameformGroup!: FormGroup;
  relaibilityformGroup!: FormGroup;
  flexibilityformGroup!: FormGroup;
  maturityformGroup!: FormGroup;
  dataSecformGroup!: FormGroup;
  geodispformGroup!: FormGroup;
  priceformGroup!: FormGroup;
  formTitle: string | undefined;
  step = false;
  provider!: Provider;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newProviderForm();
    if (this.data.row !== null) {
      this.edit(this.data.row);
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

    this.formTitle = `Update Provider ${row.name}`;
    this.nameformGroup.controls.name.setValue(row.name);
    this.relaibilityformGroup.controls.relaibility.setValue(row.reliability);
    this.flexibilityformGroup.controls.flexibility.setValue(row.flexibility);
    this.maturityformGroup.controls.maturity.setValue(row.maturity);
    this.dataSecformGroup.controls.datasecurity.setValue(row.datasecurity);
    this.geodispformGroup.controls.geodispatching.setValue(row.geodispatching);
    this.priceformGroup.controls.price.setValue(row.price);
  }
  // tslint:disable-next-line:typedef
  getValue(formGroup: FormGroup) {
    return formGroup.controls;
  }

  continue(): boolean {
    this.provider = new Provider();
    this.provider.name = this.getValue(this.nameformGroup).name.value;
    this.provider.reliability = this.getValue(this.relaibilityformGroup).relaibility.value;
    this.provider.flexibility = this.getValue(this.flexibilityformGroup).flexibility.value;
    this.provider.maturity = this.getValue(this.maturityformGroup).maturity.value;
    this.provider.datasecurity = this.getValue(this.dataSecformGroup).datasecurity.value;
    this.provider.geodispatching = this.getValue(this.geodispformGroup).geodispatching.value;
    this.provider.price = this.getValue(this.priceformGroup).price.value;
    return !this.step;
  }
}
