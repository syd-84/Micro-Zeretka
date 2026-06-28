import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreviewItem } from './admin-preview-item';

describe('AdminPreviewItem', () => {
  let component: AdminPreviewItem;
  let fixture: ComponentFixture<AdminPreviewItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPreviewItem],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPreviewItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
