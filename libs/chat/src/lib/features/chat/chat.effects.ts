import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { forkJoin } from 'rxjs';
import { map, switchMap, take, concatMap } from 'rxjs/operators';
import * as ChatActions from './chat.actions';
import { ChatConversation, ChatMessage } from '../../models/chat.models';
import { ChatService } from '../../services/chat.service';
import { PublicUserProfile, AuthFacade } from '@classifieds-ui/auth';


@Injectable()
export class ChatEffects {

  private publicUserProfilesService: EntityCollectionService<PublicUserProfile>;

  establishSocketConnection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatActions.establishSocketConnection),
      switchMap(() => {
        return this.chatService.createConnection().pipe(
          map(created => {
            if(created) {
              return ChatActions.establishSocketConnectionSuccess();
            } else {
              return ChatActions.establishSocketConnectionFailure();
            }
          })
        );
      })
    );
  });

  recieveChatmessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatActions.recieveChatMessage),
      map(action => ChatActions.recieveChatMessageSuccess({ data: action.data }))
    );
  });

  sendChatmessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatActions.sendChatMessage),
      concatMap(action => {
        return this.es.getEntityCollectionService('ChatMessage').add(action.data).pipe(
          map(() => ChatActions.sendChatMessageSuccess())
        );
      })
    );
  });

  loadChatConversations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatActions.loadChatConversation),
      fetch({
        run: action => {
          return forkJoin([
            this.publicUserProfilesService.getByKey(action.recipientId),
            this.authFacade.getUser$.pipe(
              switchMap(user => this.publicUserProfilesService.getByKey(user.profile.sub)),
              take(1)
            ),
            this.es.getEntityCollectionService('ChatMessage').getWithQuery({ recipientId: action.recipientId }).pipe(
              map(messages => {
                const messagesCopy = messages.map(m => new ChatMessage(m));
                messagesCopy.sort((m1, m2) => {
                  const md1 = new Date(m1.createdAt);
                  const md2 = new Date(m2.createdAt);
                  if (md1 > md2)
                  return 1;
                  if (md1 < md2)
                  return -1;
                  return 0;
                });
                return messagesCopy;
              })
            )
          ]).pipe(
            map(([recipient, user, messages]) => {
              return ChatActions.loadChatConversationSuccess({
                data: new ChatConversation({
                  id: undefined,
                  userId: user.id,
                  userLabel: user.userName,
                  recipientId: recipient.id,
                  recipientLabel:
                  recipient.userName,
                  messages
                })
              });
            })
          );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        }
      })
    );
  });


  constructor(private actions$: Actions, private authFacade: AuthFacade, private es: EntityServices, private chatService: ChatService) {
    this.publicUserProfilesService = es.getEntityCollectionService('PublicUserProfile')
  }

}
