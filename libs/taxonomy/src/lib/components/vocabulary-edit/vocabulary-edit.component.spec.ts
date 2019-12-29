import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyDetailComponent } from './vocabulary-detail.component';

describe('VocabularyDetailComponent', () => {
  let component: VocabularyDetailComponent;
  let fixture: ComponentFixture<VocabularyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
