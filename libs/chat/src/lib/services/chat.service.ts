import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, ReplaySubject, Subject, of } from 'rxjs';
import { AuthFacade } from '@classifieds-ui/auth';
import { LogService } from '@classifieds-ui/logging';
import { Observable } from 'rxjs';
import { tap, take, map, switchMap } from 'rxjs/operators';
import * as signalR from "@aspnet/signalr";
//import { OktaAuthService } from '@okta/okta-angular';

import { ChatSettings, ChatMessage, ChatConversation } from '../models/chat.models';

import { CHAT_SETTINGS } from '../chat.tokens';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  started$ = new ReplaySubject<boolean>(1);
  broadcasted$ = new Subject<ChatMessage>();
  private conversations = new Map<string, BehaviorSubject<Array<ChatMessage>>>();
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private ws: WebSocket;
  private userId: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(CHAT_SETTINGS) private chatSettings: ChatSettings, private logService: LogService, private authFacade: AuthFacade) {
    if (this.isBrowser) {
      setTimeout(() => this.initializeConnection(), 1);
    }
  }

  private initializeConnection(): void {
    if(this.ws !== undefined) {
      this.ws.close();
    }
    this.authFacade.getUser$.pipe(
      take(1),
    ).subscribe(user => {
      this.userId = user.profile.sub;
      this.ws = new WebSocket(`${this.chatSettings.endpointUrl}?token=${user.access_token}`);
      this.ws.addEventListener('open', () => {
        this.started$.next(true);
        this.initializeListeners();
      });
      this.ws.addEventListener('error', (evt) => {
        this.logService.log(evt);
        this.started$.next(false);
      });
    });
  }

 connect(recipientId: string): BehaviorSubject<Array<ChatMessage>> {
    this.initializeConversation(recipientId);
    /*this.ws.send(JSON.stringify({ action: "messages", recipientId }));
    const listener = evt => {
      const chatMessages = JSON.parse(evt.data).map(d => new ChatMessage(d));
      this.conversations.get(recipientId).next(chatMessages);
      this.ws.removeEventListener('message', listener);
    };
    this.ws.addEventListener('message', listener);*/
    // setTimeout(() => this.conversations.get(recipientId).next([]), 0)
    return this.conversations.get(recipientId);
  }

  send(chatMessage: ChatMessage): void {
    this.ws.send(JSON.stringify({ action: "message", message: chatMessage }));
  }

  /*getConversations(): Observable<Array<ChatConversation>> {
    this.ws.send(JSON.stringify({ action: "conversations", data: {  } }));
    const conversations$ = new Subject<Array<ChatConversation>>();
    const listener = evt => {
      const conversations = JSON.parse(evt.data).map(d => new ChatConversation(d));
      conversations$.next(conversations);
      conversations$.complete();
      this.ws.removeEventListener('message', listener);
    };
    this.ws.addEventListener('message', listener);
    return conversations$;
  }*/

  private initializeListeners(): void {
    /*this.hubConnection.on('connected', (recipientId: string, chatMessages) => {
      this.conversations.get(recipientId).next(chatMessages);
    });
    this.hubConnection.on('broadcastMessage', (chatMessage: ChatMessage, reply: boolean) => {
      this.conversations.get(reply ? chatMessage.senderId : chatMessage.recipientId).next([chatMessage]);
    });*/
    this.ws.addEventListener('message', (evt) => {
      const data = JSON.parse(evt.data);
      if(data.length === undefined) {
        const message = new ChatMessage(data);
        this.conversations.get(message.senderId === this.userId ? message.senderId : message.recipientId).next([message]);
      }
    })
  }

  private initializeConversation(recipientId: string): void {
    if(!this.conversations.has(recipientId)) {
      this.conversations.set(recipientId, new BehaviorSubject<Array<ChatMessage>>([]));
    }
  }

}
