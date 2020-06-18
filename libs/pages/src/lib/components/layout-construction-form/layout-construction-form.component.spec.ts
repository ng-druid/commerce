import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConstructionFormComponent } from './layout-construction-form.component';

describe('LayoutConstructionFormComponent', () => {
  let component: LayoutConstructionFormComponent;
  let fixture: ComponentFixture<LayoutConstructionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutConstructionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutConstructionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
