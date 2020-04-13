import { async, TestBed } from '@angular/core/testing';
import { RealestateModule } from './realestate.module';

describe('RealestateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RealestateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RealestateModule).toBeDefined();
  });
});
