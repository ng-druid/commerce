import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditorOverlayComponent } from './content-editor-overlay.component';

describe('ContentEditorOverlayComponent', () => {
  let component: ContentEditorOverlayComponent;
  let fixture: ComponentFixture<ContentEditorOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentEditorOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditorOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
