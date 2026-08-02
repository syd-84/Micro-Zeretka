import { TestBed } from '@angular/core/testing';

import { CartModal } from './cart-modal';

describe('CartModal', () => {
  let service: CartModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
