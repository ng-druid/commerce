import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
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

  attributeValues:  Array<AttributeValue> = [];

  rendererOverride: Snippet;
  rendererSettings: Array<AttributeValue>;

  tokens: Map<string, any>;

  constructor(private handler: AttributeContentHandler, private tokenizerService: TokenizerService) { }

  ngOnInit(): void {
    this.attributeValues = this.handler.valueSettings(this.settings);
    this.tokens = this.tokenizerService.generateTokens(this.attributeValues);
    console.log(this.tokens);
    this.handler.rendererSnippet(this.settings).subscribe(snippet => {
      this.rendererOverride = snippet;
      if(snippet !== undefined) {
        this.rendererSettings = this.handler.rendererOverrideSettings(snippet)[0].attributes;
      }
    });
  }

}
