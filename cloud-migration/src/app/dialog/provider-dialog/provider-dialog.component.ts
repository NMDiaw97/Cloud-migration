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

  provider!: Provider;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.provider = this.data.row
  }
}
