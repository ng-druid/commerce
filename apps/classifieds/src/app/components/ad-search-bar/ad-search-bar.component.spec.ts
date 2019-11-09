import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSearchBarComponent } from './ad-search-bar.component';

describe('AdSearchBarComponent', () => {
  let component: AdSearchBarComponent;
  let fixture: ComponentFixture<AdSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
