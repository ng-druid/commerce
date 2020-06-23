import { SnippetContentHandler } from './handlers/snippet-content.handler';
import { AttributeContentHandler, AttributePaneRendererComponent, AttributeEditorComponent } from '@classifieds-ui/attributes';
import { ContentPlugin } from '@classifieds-ui/content';
import { SnippetPaneRendererComponent } from './components/snippet-pane-renderer/snippet-pane-renderer.component';
import { SnippetEditorComponent } from './components/snippet-editor/snippet-editor.component';
import { AttributeSelectorComponent } from './components/attribute-selector/attribute-selector.component';

export const snippetContentPluginFactory = (handler: SnippetContentHandler) => {
  return new ContentPlugin({
    name: 'snippet',
    title: 'Snippet',
    selectionComponent: undefined,
    editorComponent: SnippetEditorComponent,
    renderComponent: SnippetPaneRendererComponent,
    handler
  })
}

export const attributeContentPluginFactory = (handler: AttributeContentHandler) => {
  return new ContentPlugin({
    name: 'attribute',
    title: 'Attribute',
    selectionComponent: AttributeSelectorComponent,
    editorComponent: AttributeEditorComponent,
    renderComponent: AttributePaneRendererComponent,
    handler
  })
}
