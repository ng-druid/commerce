import { SnippetContentHandler } from './handlers/snippet-content.handler';
import { AttributeContentHandler } from './handlers/attribute-content.handler';
import { MediaContentHandler } from './handlers/media-content.handler';
import { PanelContentHandler } from './handlers/panel-content.handler';
import { ContentPlugin } from '@classifieds-ui/content';
import { SnippetPaneRendererComponent } from './plugins/snippet/snippet-pane-renderer/snippet-pane-renderer.component';
import { SnippetEditorComponent } from './plugins/snippet/snippet-editor/snippet-editor.component';
import { AttributeSelectorComponent } from './plugins/attribute/attribute-selector/attribute-selector.component';
import { AttributeEditorComponent } from './plugins/attribute/attribute-editor/attribute-editor.component';
import { AttributePaneRendererComponent } from './plugins/attribute/attribute-pane-renderer/attribute-pane-renderer.component';
import { MediaEditorComponent } from './plugins/media/media-editor/media-editor.component';
import { MediaPaneRendererComponent } from './plugins/media/media-pane-renderer/media-pane-renderer.component';
import { PanelSelectorComponent } from './plugins/panel/panel-selector/panel-selector.component';
import { PanelEditorComponent } from './plugins/panel/panel-editor/panel-editor.component';
import { RestEditorComponent } from './plugins/rest/rest-editor/rest-editor.component';
import { RestContentHandler } from './handlers/rest-content-handler.service';
import { RestPaneRendererComponent } from './plugins/rest/rest-pane-renderer/rest-pane-renderer.component';
import { SliceContentHandler } from './handlers/slice-content.handler';
import { SliceEditorComponent } from './plugins/slice/slice-editor/slice-editor.component';

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

export const panelContentPluginFactory = (handler: PanelContentHandler) => {
  return new ContentPlugin({
    name: 'panel',
    title: 'Panel',
    selectionComponent: PanelSelectorComponent,
    editorComponent: PanelEditorComponent,
    renderComponent: undefined,
    handler
  })
}

export const restContentPluginFactory = (handler: RestContentHandler) => {
  return new ContentPlugin({
    name: 'rest',
    title: 'REST',
    selectionComponent: undefined,
    editorComponent: RestEditorComponent,
    renderComponent: RestPaneRendererComponent,
    handler
  })
}

export const sliceContentPluginFactory = (handler: SliceContentHandler) => {
  return new ContentPlugin({
    name: 'slice',
    title: 'Slice',
    selectionComponent: undefined,
    editorComponent: SliceEditorComponent,
    renderComponent: undefined,
    handler
  })
}
