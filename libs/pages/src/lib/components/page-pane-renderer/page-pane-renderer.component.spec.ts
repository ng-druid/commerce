import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePaneRendererComponent } from './page-pane-renderer.component';

describe('PagePaneRendererComponent', () => {
  let component: PagePaneRendererComponent;
  let fixture: ComponentFixture<PagePaneRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePaneRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePaneRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
