import { async, TestBed } from '@angular/core/testing';
import { JsonschemaModule } from './jsonschema.module';

describe('JsonschemaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [JsonschemaModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(JsonschemaModule).toBeDefined();
  });
});
