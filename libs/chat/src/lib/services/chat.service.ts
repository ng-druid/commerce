import { Injectable, Inject } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { AuthFacade } from '@classifieds-ui/auth';
import { LogService } from '@classifieds-ui/logging';
import { take, map } from 'rxjs/operators';
import * as signalR from "@aspnet/signalr";

import { ChatSettings, ChatMessage } from '../models/chat.models';

import { CHAT_SETTINGS } from '../chat.tokens';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  started$ = new ReplaySubject();
  connected$ = new Subject<Array<ChatMessage>>();
  broadcasted$ = new Subject<ChatMessage>();
  private hubConnection: signalR.HubConnection;

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
        this.started$.next();
        this.initializeListeners();
      })
      .catch(err => {
        console.log(`Error while starting SignalR connection: ${err}`);
        this.logService.log(err);
      });
  }

  connect(userId: string) {
    this.hubConnection.invoke('connect', userId);
  }

  send(chatMessage: ChatMessage): void {
    this.hubConnection.invoke('send', chatMessage)
  }

  private initializeListeners(): void {
    this.hubConnection.on('connected', chatMessages => {
      this.connected$.next(chatMessages);
    });
    this.hubConnection.on('broadcastMessage', (chatMessage: ChatMessage) => {
      this.broadcasted$.next(chatMessage);
    });
  }

}
