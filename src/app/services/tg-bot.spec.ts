import { TestBed } from '@angular/core/testing';

import { TgBot } from './tg-bot';

describe('TgBot', () => {
  let service: TgBot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TgBot);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
