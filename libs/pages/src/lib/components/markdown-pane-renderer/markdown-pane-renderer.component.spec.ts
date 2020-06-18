import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPaneRendererComponent } from './markdown-pane-renderer.component';

describe('MarkdownPaneRendererComponent', () => {
  let component: MarkdownPaneRendererComponent;
  let fixture: ComponentFixture<MarkdownPaneRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownPaneRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPaneRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
