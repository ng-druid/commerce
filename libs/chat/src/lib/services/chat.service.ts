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
  connected$ = new Subject<string>();
  broadcasted$ = new Subject<ChatMessage>();
  private hubConnection: signalR.HubConnection;
  private conversations = new Map<string, BehaviorSubject<Array<ChatMessage>>>();
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private ws: WebSocket;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(CHAT_SETTINGS) private chatSettings: ChatSettings, private logService: LogService, private authFacade: AuthFacade) {
    if (this.isBrowser) {
      setTimeout(() => this.initializeConnection(), 1);
    }
  }

  private initializeConnection(): void {
    this.authFacade.getUser$.pipe(
      take(1),
      map(u => `${u.access_token}` )
    ).subscribe(token => {
      this.ws = new WebSocket(`${this.chatSettings.endpointUrl}?token=${token}`);
      this.ws.addEventListener('open', () => {
        this.started$.next(true);
        console.log("opened");
        this.initializeListeners();
      });
      this.ws.addEventListener('error', (evt) => {
        console.log(`Error establishing websocket connection: ${evt}`);
        this.logService.log(evt);
        this.started$.next(false);
      });
    });
    /*this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.chatSettings.endpointUrl}/chat`, {
      accessTokenFactory: (): Promise<string> => this.authFacade.getUser$.pipe(take(1), map(u => `${u.access_token}` )).toPromise(),
      // accessTokenFactory: (): Promise<string> => this.oktaAuth.getAccessToken(),
      transport: signalR.HttpTransportType.WebSockets,
      skipNegotiation: true
    })
    .build();*/
    /*this.hubConnection
      .start()
      .then(() => {
        this.started$.next(true);
        this.initializeListeners();
      })
      .catch(err => {
        console.log(`Error while starting SignalR connection: ${err}`);
        this.logService.log(err);
        this.started$.next(false);
      });*/
  }

  connect(recipientId: string): BehaviorSubject<Array<ChatMessage>> {
    this.initializeConversation(recipientId);
    /*this.hubConnection.invoke('connect', recipientId)
    .then(() => {
      this.connected$.next(recipientId);
    })
    .catch(err => {
      this.logService.log(err);
    })*/
    return this.conversations.get(recipientId);
  }

  send(chatMessage: ChatMessage): void {
    // this.hubConnection.invoke('send', chatMessage)
    this.ws.send(JSON.stringify(chatMessage));
  }

  getConversations(): Observable<Array<ChatConversation>> {
    // return of([]);
    /*return new Observable(obs => {
      this.hubConnection.invoke('getconversations').then(chats => {
        obs.next(chats.map(c => new ChatConversation(c)));
        obs.complete();
      }).catch(err => {
        this.logService.log(err);
        obs.error(err);
        obs.complete();
      })
    });*/
    console.log('get conversations');
    this.ws.send(JSON.stringify({ action: "conversations", data: {} }));
    const conversations$ = new Subject<Array<ChatConversation>>();
    const listener = evt => {
      const chatMessages = JSON.parse(evt.data).map(d => new ChatConversation(d));
      console.log(chatMessages);
      conversations$.next(chatMessages);
      conversations$.complete();
      this.ws.removeEventListener('message', listener);
    };
    this.ws.addEventListener('message', listener);
    return conversations$;
  }

  private initializeListeners(): void {
    /*this.hubConnection.on('connected', (recipientId: string, chatMessages) => {
      this.conversations.get(recipientId).next(chatMessages);
    });
    this.hubConnection.on('broadcastMessage', (chatMessage: ChatMessage, reply: boolean) => {
      this.conversations.get(reply ? chatMessage.senderId : chatMessage.recipientId).next([chatMessage]);
    });*/
    /*this.ws.addEventListener('message', (evt) => {
      console.log("Message Received");
      console.log(evt);
      const chatMessages = JSON.parse(evt.data).map(d => new ChatConversation(d));
      this.conversations$.next(chatMessages);
      this.conversations$.complete();
    })*/
  }

  private initializeConversation(recipientId: string): void {
    if(!this.conversations.has(recipientId)) {
      this.conversations.set(recipientId, new BehaviorSubject<Array<ChatMessage>>([]));
    }
  }

}
