import { TestBed } from '@angular/core/testing';

import { Goods } from './goods';

describe('Goods', () => {
  let service: Goods;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Goods);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
