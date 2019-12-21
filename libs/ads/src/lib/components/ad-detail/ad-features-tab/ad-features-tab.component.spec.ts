import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdFeaturesTabComponent } from './ad-features-tab.component';

describe('AdFeaturesTabComponent', () => {
  let component: AdFeaturesTabComponent;
  let fixture: ComponentFixture<AdFeaturesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdFeaturesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdFeaturesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
