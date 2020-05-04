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
        console.log('connnected to web socket');
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
    return this.conversations.get(recipientId);
  }

  private initializeListeners(): void {
    this.ws.addEventListener('message', (evt) => {
      const data = JSON.parse(evt.data);
      console.log(evt);
      if(data.length === undefined) {
        const message = new ChatMessage(data);
        this.conversations.get(message.recipientId === this.userId ? message.senderId : message.recipientId).next([message]);
      }
    })
  }

  private initializeConversation(recipientId: string): void {
    if(!this.conversations.has(recipientId)) {
      this.conversations.set(recipientId, new BehaviorSubject<Array<ChatMessage>>([]));
    }
  }

}
