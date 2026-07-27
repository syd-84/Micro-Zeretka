import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFull } from './cart-full';

describe('CartFull', () => {
  let component: CartFull;
  let fixture: ComponentFixture<CartFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartFull],
    }).compileComponents();

    fixture = TestBed.createComponent(CartFull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
