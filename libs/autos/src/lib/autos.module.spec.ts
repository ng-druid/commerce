import { async, TestBed } from '@angular/core/testing';
import { AutosModule } from './autos.module';

describe('AutosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AutosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AutosModule).toBeDefined();
  });
});
