import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyBrowserComponent } from './vocabulary-browser.component';

describe('VocabularyBrowserComponent', () => {
  let component: VocabularyBrowserComponent;
  let fixture: ComponentFixture<VocabularyBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
