import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularySearchBarComponent } from './vocabulary-search-bar.component';

describe('VocabularySearchBarComponent', () => {
  let component: VocabularySearchBarComponent;
  let fixture: ComponentFixture<VocabularySearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularySearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularySearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
