import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributDialogComponent } from './attribut-dialog.component';

describe('AttributDialogComponent', () => {
  let component: AttributDialogComponent;
  let fixture: ComponentFixture<AttributDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
