import { TestBed } from '@angular/core/testing';

import { ProviderAttributsService } from './provider-attributs.service';

describe('ProviderAttributsService', () => {
  let service: ProviderAttributsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderAttributsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
