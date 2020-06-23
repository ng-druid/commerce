import { SnippetContentHandler } from './handlers/snippet-content.handler';
import { ContentPlugin } from '@classifieds-ui/content';
import { SnippetPaneRendererComponent } from './components/snippet-pane-renderer/snippet-pane-renderer.component';
import { SnippetEditorComponent } from './components/snippet-editor/snippet-editor.component';

export const snippetContentPluginFactory = (handler: SnippetContentHandler) => {
  return new ContentPlugin({
    name: 'snippet',
    title: 'snippet',
    selectionComponent: undefined,
    editorComponent: SnippetEditorComponent,
    renderComponent: SnippetPaneRendererComponent,
    handler
  })
}
