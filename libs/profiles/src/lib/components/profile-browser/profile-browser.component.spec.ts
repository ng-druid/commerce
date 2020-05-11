import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBrowserComponent } from './profile-browser.component';

describe('ProfileBrowserComponent', () => {
  let component: ProfileBrowserComponent;
  let fixture: ComponentFixture<ProfileBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
