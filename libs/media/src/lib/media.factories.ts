import { MediaContentHandler } from './handlers/media-content.handler';
import { ContentPlugin } from '@classifieds-ui/content';
import { MediaEditorComponent } from './components/media-editor/media-editor.component';
import { MediaPaneRendererComponent } from './components/media-pane-renderer/media-pane-renderer.component';

export const mediaContentPluginFactory = (handler: MediaContentHandler) => {
  return new ContentPlugin({
    name: 'media',
    title: 'Media',
    selectionComponent: undefined,
    editorComponent: MediaEditorComponent,
    renderComponent: MediaPaneRendererComponent,
    handler
  })
}
