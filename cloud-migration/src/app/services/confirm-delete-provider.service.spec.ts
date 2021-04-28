import { TestBed } from '@angular/core/testing';

import { ConfirmDeleteProviderService } from './confirm-delete-provider.service';

describe('ConfirmDeleteProviderService', () => {
  let service: ConfirmDeleteProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDeleteProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
