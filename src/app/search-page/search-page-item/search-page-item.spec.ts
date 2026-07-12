import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageItem } from './search-page-item';

describe('SearchPageItem', () => {
  let component: SearchPageItem;
  let fixture: ComponentFixture<SearchPageItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageItem],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPageItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
