import { TestBed } from '@angular/core/testing';

import { ChatConversationsDataService } from './chat-conversations-data.service';

describe('ChatConversationsDataService', () => {
  let service: ChatConversationsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatConversationsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
