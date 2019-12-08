import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDetailTabComponent } from './ad-detail-tab.component';

describe('AdDetailTabComponent', () => {
  let component: AdDetailTabComponent;
  let fixture: ComponentFixture<AdDetailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDetailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
