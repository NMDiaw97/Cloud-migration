import { Component, OnInit } from '@angular/core';
import { CriteriaStoreService } from '../services/criteria-store.service';

@Component({
  selector: 'app-criteria-management',
  templateUrl: './criteria-management.component.html',
  styleUrls: ['./criteria-management.component.css']
})
export class CriteriaManagementComponent implements OnInit {

  constructor(
    private criterionService: CriteriaStoreService
  ) { }

  ngOnInit(): void {
    this.criterionService.getCriterion().then( data => {
      console.log('data', data);
    })
    .catch(e => {
      console.log('error', e);
    });
  }

}
