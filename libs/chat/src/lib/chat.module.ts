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
import { entityMetadata } from './entity-metadata';
import { EntityDefinitionService } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import * as fromChat from './features/chat/chat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './features/chat/chat.effects';

const routes = [
  { path: '', component: ChatBrowserComponent, children: [
    { path: ':recipientId', component: ChatDetailComponent },
  ] },
];

@NgModule({
  imports: [
    CommonModule,
    NbChatModule.forChild(),
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature(fromChat.chatFeatureKey, fromChat.reducer),
    EffectsModule.forFeature([ChatEffects])
  ],
  declarations: [ChatBoxComponent, ChatMasterComponent, ChatDetailComponent, ChatBrowserComponent],
  exports: [ChatBoxComponent]
})
export class ChatModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
