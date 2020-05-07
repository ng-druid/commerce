import { async, TestBed } from '@angular/core/testing';
import { ProfilesModule } from './profiles.module';

describe('LibsProfilesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProfilesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProfilesModule).toBeDefined();
  });
});
