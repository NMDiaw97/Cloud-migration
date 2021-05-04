
import { AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Field, Idata } from 'src/app/class/field';
import { CriteriaStoreService } from 'src/app/services/criteria-store.service';
@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})

export class CriteriaComponent implements OnInit, AfterViewInit {

  criterionForm!: FormGroup;
  conditions!: FormArray;
  test!: boolean;
  attributes!: string[];
  allFields: Idata[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private fieldService: CriteriaStoreService) {

  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.criterionForm = this.formBuilder.group({
      criterionName: ['', Validators.required],
      attribute: ['', Validators.required],
      conditions: this.formBuilder.array([ this.createCondition() ])
    });
    this.attributes = ['criticity', 'complexity', 'availability'];
    this.getAllCondByNamespace();
  }

  getAllCondByNamespace(): void {
    this.attributes.forEach(attr => {
      this.fieldService.getCondByNanespace(attr).then( data => {
        const source = new Idata();
        source.name = data.namespace;
        source.condSource = data.conditions;
        this.allFields.push(source);
        console.warn(this.allFields);
      })
      .catch(e => {
        console.log(e);
      });
    });
  }



  createCondition(): FormGroup {
    return this.formBuilder.group({
      condName: new FormControl(''),
      condValue: new FormControl('')
    });
  }

  addCond(): void {
    const conditions = this.criterionForm.get('conditions') as FormArray;
    conditions.push(this.createCondition());
  }

  removeCond(i: number): void {
    const conditions = this.criterionForm.get('conditions') as FormArray;
    conditions.removeAt(i);
  }

  // tslint:disable-next-line:typedef
  getControles() {
    return (this.criterionForm.get('conditions') as FormArray).controls;
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.criterionForm.controls;
  }

  submitForm(): void {
    if (this.criterionForm.invalid) {
      return;
    }
    const criterionData = new Field();
    criterionData.criterion = this.f.criterionName.value;
    criterionData.conditions = this.f.conditions.value;
    console.warn(criterionData);
    const namespace = this.f.attribute.value;
    this.fieldService.setConditions(criterionData, namespace).then( data => {
      console.log(data);
    })
    .catch( e => {
      console.log(e);
    });
  }

}
