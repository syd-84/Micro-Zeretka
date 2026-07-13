import { TestBed } from '@angular/core/testing';

import { ConfirmPassword } from './confirm-password';

describe('ConfirmPassword', () => {
  let service: ConfirmPassword;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmPassword);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
