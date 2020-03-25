import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YmmSelectorComponent } from './ymm-selector.component';

describe('YmmSelectorComponent', () => {
  let component: YmmSelectorComponent;
  let fixture: ComponentFixture<YmmSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YmmSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YmmSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
