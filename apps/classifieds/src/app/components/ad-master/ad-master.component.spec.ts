import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdMasterComponent } from './ad-master.component';

describe('AdMasterComponent', () => {
  let component: AdMasterComponent;
  let fixture: ComponentFixture<AdMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
