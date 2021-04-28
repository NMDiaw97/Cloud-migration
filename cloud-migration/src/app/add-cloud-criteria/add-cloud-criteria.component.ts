import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import { CloudCriteria } from '../models/cloud-criteria.model';
import { CloudCriteriaService } from '../services/cloud-criteria.service';
import { MatDialogRef } from '@angular/material/dialog';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-add-cloud-criteria',
  templateUrl: './add-cloud-criteria.component.html',
  styleUrls: ['./add-cloud-criteria.component.css']
})
export class AddCloudCriteriaComponent implements OnInit {
 

  constructor(private formBuilder:FormBuilder, private cloudCritriaService: CloudCriteriaService, public diaologRef:MatDialogRef<CloudCriteria>) { }

  CloudCriteriaForm : FormGroup= new FormGroup({ 
    $key:new FormControl(null),
    name: new FormControl('',Validators.required),
    reliability:new FormControl('',Validators.required),
    maturity: new FormControl('',Validators.required),
    data_security: new FormControl('',Validators.required),
    geolocation:new FormControl('',Validators.required),
    price: new FormControl('',  Validators.required),
    flexibility: new FormControl('',Validators.required)
  }
);

onSubmit(){
  if(this.CloudCriteriaForm.invalid){
    return ;
  }
  let cloudCriteria: CloudCriteria = new CloudCriteria()
  cloudCriteria.name = this.CloudCriteriaForm.value.name
  cloudCriteria.data_security = this.CloudCriteriaForm.value.data_security
  cloudCriteria.flexibility = this.CloudCriteriaForm.value.flexibility
  cloudCriteria.reliability= this.CloudCriteriaForm.value.reliability
  cloudCriteria.geolocation = this.CloudCriteriaForm.value.geolocation
  cloudCriteria.maturity = this.CloudCriteriaForm.value.maturity
  cloudCriteria.price = this.CloudCriteriaForm.value.price
  this.addProvider(cloudCriteria)

}


  ngOnInit(): void {
  }

  addProvider(cloudCriteria:CloudCriteria){
    this.cloudCritriaService.addCloudCriteria(cloudCriteria).subscribe(
      data => console.log(data)
    )

  }

}
