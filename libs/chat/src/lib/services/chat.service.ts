import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { AuthFacade } from '@classifieds-ui/auth';
import { LogService } from '@classifieds-ui/logging';
import { Observable } from 'rxjs';
import { tap, take, map, switchMap } from 'rxjs/operators';
import * as signalR from "@aspnet/signalr";

import { ChatSettings, ChatMessage, ChatConversation } from '../models/chat.models';

import { CHAT_SETTINGS } from '../chat.tokens';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  started$ = new ReplaySubject<boolean>(1);
  connected$ = new Subject<string>();
  broadcasted$ = new Subject<ChatMessage>();
  private hubConnection: signalR.HubConnection;
  private conversations = new Map<string, BehaviorSubject<Array<ChatMessage>>>();

  constructor(@Inject(CHAT_SETTINGS) private chatSettings: ChatSettings, private logService: LogService, private authFacade: AuthFacade) {
    setTimeout(() => this.initializeConnection(), 1);
  }

  private initializeConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.chatSettings.endpointUrl}/chat`, {
      accessTokenFactory: (): Promise<string> => this.authFacade.getUser$.pipe(take(1), map(u => `${u.access_token}` )).toPromise(),
      transport: signalR.HttpTransportType.WebSockets,
      skipNegotiation: true
    })
    .build();
    this.hubConnection
      .start()
      .then(() => {
        this.started$.next(true);
        this.initializeListeners();
      })
      .catch(err => {
        console.log(`Error while starting SignalR connection: ${err}`);
        this.logService.log(err);
        this.started$.next(false);
      });
  }

  connect(recipientId: string): BehaviorSubject<Array<ChatMessage>> {
    this.initializeConversation(recipientId);
    this.hubConnection.invoke('connect', recipientId)
    .then(() => {
      this.connected$.next(recipientId);
    })
    .catch(err => {
      this.logService.log(err);
    })
    return this.conversations.get(recipientId);
  }

  send(chatMessage: ChatMessage): void {
    this.hubConnection.invoke('send', chatMessage)
  }

  getConversations(): Observable<Array<ChatConversation>> {
    return new Observable(obs => {
      this.hubConnection.invoke('getconversations').then(chats => {
        obs.next(chats.map(c => new ChatConversation(c)));
        obs.complete();
      }).catch(err => {
        this.logService.log(err);
        obs.error(err);
        obs.complete();
      })
    });
  }

  private initializeListeners(): void {
    this.hubConnection.on('connected', (recipientId: string, chatMessages) => {
      this.conversations.get(recipientId).next(chatMessages);
    });
    this.hubConnection.on('broadcastMessage', (chatMessage: ChatMessage, reply: boolean) => {
      this.conversations.get(reply ? chatMessage.senderId : chatMessage.recipientId).next([chatMessage]);
    });
  }

  private initializeConversation(recipientId: string): void {
    if(!this.conversations.has(recipientId)) {
      this.conversations.set(recipientId, new BehaviorSubject<Array<ChatMessage>>([]));
    }
  }

}
