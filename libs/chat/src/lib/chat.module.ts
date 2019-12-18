import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { NbChatModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatMasterComponent } from './components/chat-master/chat-master.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import { ChatBrowserComponent } from './components/chat-browser/chat-browser.component';
import { MaterialModule } from '@classifieds-ui/material';

const routes = [
  { path: '', component: ChatBrowserComponent, children: [
    { path: ':recipientId', component: ChatDetailComponent },
  ] },
];

@NgModule({
  imports: [
    CommonModule,
    NbChatModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ChatBoxComponent, ChatMasterComponent, ChatDetailComponent, ChatBrowserComponent],
  exports: [ChatBoxComponent]
})
export class ChatModule {}
