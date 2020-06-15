import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, ReplaySubject, Subject, of } from 'rxjs';
import { AuthFacade } from '@classifieds-ui/auth';
import { LogService } from '@classifieds-ui/logging';
import { Observable } from 'rxjs';
import { tap, take, map, switchMap } from 'rxjs/operators';
import * as signalR from "@aspnet/signalr";
//import { OktaAuthService } from '@okta/okta-angular';
import { Store } from '@ngrx/store';
import { State } from '../features/chat/chat.reducer';
import * as fromActions from '../features/chat/chat.actions';

import { ChatSettings, ChatMessage, ChatConversation } from '../models/chat.models';

import { CHAT_SETTINGS } from '../chat.tokens';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private ws: WebSocket;
  constructor(@Inject(CHAT_SETTINGS) private chatSettings: ChatSettings, private logService: LogService, private authFacade: AuthFacade, private store: Store<State>) {}
  createConnection(): Observable<boolean> {
    if(this.ws !== undefined) {
      return of(true);
    } else {
      return new Observable(obs => {
        this.authFacade.getUser$.pipe(
          take(1),
        ).subscribe(user => {
          try {
            this.ws = new WebSocket(`${this.chatSettings.endpointUrl}?token=${user.access_token}`);
          } catch(e) {
            console.log(e);
            // throw e;
          }
          this.ws.addEventListener('open', () => {
            console.log("connected");
            obs.next(true);
            obs.complete();
          });
          this.ws.addEventListener('error', (evt) => {
            this.logService.log(evt);
            obs.next(false);
            obs.complete();
          });
          this.ws.addEventListener('message', (evt) => {
            console.log(evt);
            const data = JSON.parse(evt.data);
            const message = new ChatMessage(data);
            this.store.dispatch(fromActions.recieveChatMessage({ data: message }));
          });
        });
      });
    }
  }
}
