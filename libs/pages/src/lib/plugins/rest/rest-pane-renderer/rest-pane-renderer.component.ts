import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { Store, select } from '@ngrx/store';
import { PageBuilderFacade } from '../../../features/page-builder/page-builder.facade';
import { PageBuilderPartialState } from '../../../features/page-builder/page-builder.reducer';
import { RestContentHandler } from '../../../handlers/rest-content-handler.service';
import { selectDataset } from '../../../features/page-builder/page-builder.selectors';
import { map, filter } from 'rxjs/operators';
import { ControlContainer } from '@angular/forms';
import { TokenizerService } from '@classifieds-ui/token';
import { SelectOption, SelectMapping, Snippet } from '../../../models/plugin.models';

@Component({
  selector: 'classifieds-ui-rest-pane-renderer',
  templateUrl: './rest-pane-renderer.component.html',
  styleUrls: ['./rest-pane-renderer.component.scss']
})
export class RestPaneRendererComponent implements OnInit {

  static counter = 0;

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  displayType: string;

  options: Array<SelectOption>;

  private snippet: Snippet;

  get renderType() {
    return this.restHandler.getRenderType(this.settings);
  }

  constructor(
    private pageBuilderFacade: PageBuilderFacade,
    private store: Store<PageBuilderPartialState>,
    private restHandler: RestContentHandler,
    private tokenizerService: TokenizerService,
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    const tag = `data_${RestPaneRendererComponent.counter++}`;
    this.restHandler.toObject(this.settings).subscribe(r => {
      this.snippet = r.renderer.data;
      this.pageBuilderFacade.loadRestData(tag, r);
    });
    this.store.pipe(
      select(selectDataset(tag)),
      filter(d => d !== undefined),
      map(d => d.results.map(r => this.tokenizerService.generateGenericTokens(r))),
      map<Array<Map<string, any>>,[Array<Map<string,any>>, SelectMapping]>(tokens => [tokens, (new SelectMapping(JSON.parse(this.snippet.content)))]),
      map(([tokens, mapping]) => tokens.map(t => new SelectOption({ value: this.tokenizerService.replaceTokens(mapping.value, t), label: this.tokenizerService.replaceTokens(mapping.label, t) })))
    ).subscribe(options => {
      this.options = options;
    });
  }

}
