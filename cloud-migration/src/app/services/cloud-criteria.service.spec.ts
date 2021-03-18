import { TestBed } from '@angular/core/testing';

import { CloudCriteriaService } from './cloud-criteria.service';

describe('CloudCriteriaService', () => {
  let service: CloudCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
