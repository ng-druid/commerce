import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAttributesFilterComponent } from './ad-attributes-filter.component';

describe('AdAttributesFilterComponent', () => {
  let component: AdAttributesFilterComponent;
  let fixture: ComponentFixture<AdAttributesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdAttributesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAttributesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
