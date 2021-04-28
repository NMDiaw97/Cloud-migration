import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCloudCriteriaComponent } from './add-cloud-criteria.component';

describe('AddCloudCriteriaComponent', () => {
  let component: AddCloudCriteriaComponent;
  let fixture: ComponentFixture<AddCloudCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCloudCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCloudCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
