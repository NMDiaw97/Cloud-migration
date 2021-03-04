import { TestBed } from '@angular/core/testing';

import { PricingStoreService } from './pricing-store.service';

describe('PricingStoreService', () => {
  let service: PricingStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
