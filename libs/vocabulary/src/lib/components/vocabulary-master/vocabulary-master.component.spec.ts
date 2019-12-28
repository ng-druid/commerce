import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyMasterComponent } from './vocabulary-master.component';

describe('VocabularyMasterComponent', () => {
  let component: VocabularyMasterComponent;
  let fixture: ComponentFixture<VocabularyMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
