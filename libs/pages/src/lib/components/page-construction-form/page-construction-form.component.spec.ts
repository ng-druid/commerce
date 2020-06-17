import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConstructionFormComponent } from './page-construction-form.component';

describe('PageConstructionFormComponent', () => {
  let component: PageConstructionFormComponent;
  let fixture: ComponentFixture<PageConstructionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageConstructionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageConstructionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
