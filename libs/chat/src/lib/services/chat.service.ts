import { Injectable, Inject } from '@angular/core';
import { AuthFacade } from '@classifieds-ui/auth';
import { LogService } from '@classifieds-ui/logging';
import { take, map } from 'rxjs/operators';
import * as signalR from "@aspnet/signalr";

import { ChatSettings } from '../models/chat.models';

import { CHAT_SETTINGS } from '../chat.tokens';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection

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
        // this.joinRoom();
        console.log('connected to chat hub');
        this.initializeListeners();
        setTimeout(() => this.hubConnection.invoke('send', 'whatever', 'the message is here!'), 2000)
      })
      .catch(err => {
        console.log(`Error while starting SignalR connection: ${err}`);
        this.logService.log(err);
      });
  }

  initializeListeners(): void {
    this.hubConnection.on('broadcastMessage', function (name, message) {
      console.log('called broadcastMessage!');
      console.log(name);
      console.log(message);
    });
  }
}
