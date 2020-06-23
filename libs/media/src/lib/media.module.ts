import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { MediaEditorComponent } from './components/media-editor/media-editor.component';
import { MediaPaneRendererComponent } from './components/media-pane-renderer/media-pane-renderer.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, NgxDropzoneModule],
  providers: [
    { provide: CONTENT_PLUGIN, useValue: new ContentPlugin({ name: 'media', title: 'Media', selectionComponent: undefined, editorComponent: MediaEditorComponent, renderComponent: MediaPaneRendererComponent }), multi: true}
  ],
  declarations: [MediaEditorComponent, MediaPaneRendererComponent]
})
export class MediaModule {}
