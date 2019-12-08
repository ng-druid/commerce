import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdGalleryTabComponent } from './ad-gallery-tab.component';

describe('AdGalleryTabComponent', () => {
  let component: AdGalleryTabComponent;
  let fixture: ComponentFixture<AdGalleryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdGalleryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdGalleryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
