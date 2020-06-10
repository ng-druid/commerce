import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdListItemInfoComponent } from './ad-list-item-info.component';

describe('AdListItemInfoComponent', () => {
  let component: AdListItemInfoComponent;
  let fixture: ComponentFixture<AdListItemInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdListItemInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdListItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
