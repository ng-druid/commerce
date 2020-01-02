import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularySelectorComponent } from './vocabulary-selector.component';

describe('VocabularySelectorComponent', () => {
  let component: VocabularySelectorComponent;
  let fixture: ComponentFixture<VocabularySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
