import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { passwordGuard } from './password-guard';

describe('passwordGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => passwordGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
