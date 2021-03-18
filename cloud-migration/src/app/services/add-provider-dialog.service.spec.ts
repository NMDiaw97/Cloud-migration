import { TestBed } from '@angular/core/testing';

import { AddProviderDialogService } from './add-provider-dialog.service';

describe('AddProviderDialogService', () => {
  let service: AddProviderDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProviderDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
