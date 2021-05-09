import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderAttribut } from 'src/app/class/provider-attribut';

@Component({
  selector: 'app-attribut-dialog',
  templateUrl: './attribut-dialog.component.html',
  styleUrls: ['./attribut-dialog.component.css']
})
export class AttributDialogComponent implements OnInit {

  attribut!: ProviderAttribut;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.attribut = this.data.row;
  }

}
