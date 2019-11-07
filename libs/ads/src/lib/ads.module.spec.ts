import { async, TestBed } from '@angular/core/testing';
import { AdsModule } from './ads.module';

describe('AdsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AdsModule).toBeDefined();
  });
});
