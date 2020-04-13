import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateAdListItemComponent } from './realestate-ad-list-item.component';

describe('RealestateAdListItemComponent', () => {
  let component: RealestateAdListItemComponent;
  let fixture: ComponentFixture<RealestateAdListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestateAdListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestateAdListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
