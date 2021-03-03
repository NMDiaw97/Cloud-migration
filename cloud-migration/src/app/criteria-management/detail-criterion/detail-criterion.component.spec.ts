import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCriterionComponent } from './detail-criterion.component';

describe('DetailCriterionComponent', () => {
  let component: DetailCriterionComponent;
  let fixture: ComponentFixture<DetailCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
