import { async, TestBed } from '@angular/core/testing';
import { ClassifiedsMaterialModule } from './classifieds-material.module';

describe('ClassifiedsMaterialModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClassifiedsMaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClassifiedsMaterialModule).toBeDefined();
  });
});
