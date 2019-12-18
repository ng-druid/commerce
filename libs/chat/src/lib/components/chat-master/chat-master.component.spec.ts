import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMasterComponent } from './chat-master.component';

describe('ChatMasterComponent', () => {
  let component: ChatMasterComponent;
  let fixture: ComponentFixture<ChatMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
