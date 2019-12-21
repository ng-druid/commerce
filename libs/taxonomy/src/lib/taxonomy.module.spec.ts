import { async, TestBed } from '@angular/core/testing';
import { TaxonomyModule } from './taxonomy.module';

describe('TaxonomyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TaxonomyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TaxonomyModule).toBeDefined();
  });
});
