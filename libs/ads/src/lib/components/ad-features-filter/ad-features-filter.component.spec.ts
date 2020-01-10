import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdFeaturesFilterComponent } from './ad-features-filter.component';

describe('FeaturesFilterComponent', () => {
  let component: AdFeaturesFilterComponent;
  let fixture: ComponentFixture<AdFeaturesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdFeaturesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdFeaturesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
