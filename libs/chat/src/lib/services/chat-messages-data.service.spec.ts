import { TestBed } from '@angular/core/testing';

import { ChatMessagesDataService } from './chat-messages-data.service';

describe('ChatMessagesDataService', () => {
  let service: ChatMessagesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMessagesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
