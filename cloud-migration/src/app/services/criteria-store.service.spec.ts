import { TestBed } from '@angular/core/testing';

import { CriteriaStoreService } from './criteria-store.service';

describe('CriteriaStoreService', () => {
  let service: CriteriaStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteriaStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
