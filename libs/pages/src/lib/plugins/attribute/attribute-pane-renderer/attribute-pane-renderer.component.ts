import { Component, OnInit, Input, Inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ATTRIBUTE_WIDGET, AttributeValue, AttributeWidget, Attribute } from '@classifieds-ui/attributes';
import { AttributeContentHandler } from '../../../handlers/attribute-content.handler';
import { Snippet } from '../../../models/page.models';
import { TokenizerService } from '@classifieds-ui/token';

@Component({
  selector: 'classifieds-ui-attribute-pane-renderer',
  templateUrl: './attribute-pane-renderer.component.html',
  styleUrls: ['./attribute-pane-renderer.component.scss']
})
export class AttributePaneRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  appearance = 'legacy';

  attributes:  Array<Attribute> = [];
  attributeValues: Array<AttributeValue>;

  rendererOverride: Snippet;
  rendererSettings: Array<AttributeValue>;

  tokens: Map<string, any>;

  constructor(
    @Inject(ATTRIBUTE_WIDGET) private widgets: Array<AttributeWidget>,
    private handler: AttributeContentHandler,
    private tokenizerService: TokenizerService,
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.attributes = [ this.widgets.find(w => w.name === this.settings.find(s => s.name === 'widget').value).schema ];
    this.attributeValues = this.handler.valueSettings(this.settings);
    this.tokens = this.tokenizerService.generateTokens(this.attributeValues);
    this.handler.rendererSnippet(this.settings).subscribe(snippet => {
      this.rendererOverride = snippet;
      if(snippet !== undefined) {
        this.rendererSettings = this.handler.rendererOverrideSettings(snippet)[0].attributes;
      }
    });
  }

}
