import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromChat from './+state/chat.reducer';
import { ChatEffects } from './+state/chat.effects';
import { ChatFacade } from './+state/chat.facade';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { NbChatModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromChat.CHAT_FEATURE_KEY, fromChat.reducer),
    EffectsModule.forFeature([ChatEffects]),
    NbChatModule
  ],
  providers: [ChatFacade],
  declarations: [ChatBoxComponent],
  exports: [ChatBoxComponent]
})
export class ChatModule {}
