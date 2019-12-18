import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBrowserComponent } from './chat-browser.component';

describe('ChatBrowserComponent', () => {
  let component: ChatBrowserComponent;
  let fixture: ComponentFixture<ChatBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
