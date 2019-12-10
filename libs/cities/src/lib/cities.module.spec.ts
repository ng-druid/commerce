import { async, TestBed } from '@angular/core/testing';
import { CitiesModule } from './cities.module';

describe('CitiesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CitiesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CitiesModule).toBeDefined();
  });
});
