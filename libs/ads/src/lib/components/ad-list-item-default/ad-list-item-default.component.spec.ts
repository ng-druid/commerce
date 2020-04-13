import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdListItemDefaultComponent } from './ad-list-item-default.component';

describe('AdListItemDefaultComponent', () => {
  let component: AdListItemDefaultComponent;
  let fixture: ComponentFixture<AdListItemDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdListItemDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdListItemDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
