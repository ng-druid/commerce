import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { NbChatModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbChatModule
  ],
  declarations: [ChatBoxComponent],
  exports: [ChatBoxComponent]
})
export class ChatModule {}
