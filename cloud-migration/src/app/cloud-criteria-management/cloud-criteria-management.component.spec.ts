import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudCriteriaManagementComponent } from './cloud-criteria-management.component';

describe('CloudCriteriaManagementComponent', () => {
  let component: CloudCriteriaManagementComponent;
  let fixture: ComponentFixture<CloudCriteriaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudCriteriaManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudCriteriaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
