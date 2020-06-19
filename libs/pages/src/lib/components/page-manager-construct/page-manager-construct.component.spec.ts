import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageManagerConstructComponent } from './page-manager-construct.component';

describe('PageManagerConstructComponent', () => {
  let component: PageManagerConstructComponent;
  let fixture: ComponentFixture<PageManagerConstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageManagerConstructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageManagerConstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
