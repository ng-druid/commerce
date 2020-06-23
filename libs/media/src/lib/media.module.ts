import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CONTENT_PLUGIN } from '@classifieds-ui/content';
import { MediaEditorComponent } from './components/media-editor/media-editor.component';
import { MediaPaneRendererComponent } from './components/media-pane-renderer/media-pane-renderer.component';
import { MediaContentHandler } from './handlers/media-content.handler';
import { mediaContentPluginFactory } from './media.factories';

@NgModule({
  imports: [CommonModule, HttpClientModule, NgxDropzoneModule],
  providers: [
    { provide: MediaContentHandler, useClass: MediaContentHandler },
    { provide: CONTENT_PLUGIN, useFactory: mediaContentPluginFactory, multi: true, deps: [MediaContentHandler] }
  ],
  declarations: [MediaEditorComponent, MediaPaneRendererComponent]
})
export class MediaModule {}
