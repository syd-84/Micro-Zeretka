import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotReadyPage } from './not-ready-page';

describe('NotReadyPage', () => {
  let component: NotReadyPage;
  let fixture: ComponentFixture<NotReadyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotReadyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotReadyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
