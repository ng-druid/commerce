import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { Store, select } from '@ngrx/store';
import { PageBuilderFacade } from '../../../features/page-builder/page-builder.facade';
import { PageBuilderPartialState } from '../../../features/page-builder/page-builder.reducer';
import { RestContentHandler } from '../../../handlers/rest-content-handler.service';
import { selectDataset } from '../../../features/page-builder/page-builder.selectors';
import { map, filter } from 'rxjs/operators';
import { TokenizerService } from '@classifieds-ui/token';
import { Snippet } from '../../../models/page.models';

@Component({
  selector: 'classifieds-ui-rest-pane-renderer',
  templateUrl: './rest-pane-renderer.component.html',
  styleUrls: ['./rest-pane-renderer.component.scss']
})
export class RestPaneRendererComponent implements OnInit {

  static counter = 0;

  @Input()
  settings: Array<AttributeValue> = [];

  data: Array<any>;

  private snippet: Snippet;

  constructor(
    private pageBuilderFacade: PageBuilderFacade,
    private store: Store<PageBuilderPartialState>,
    private restHandler: RestContentHandler,
    private tokenizerService: TokenizerService
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
      map(d => d.results.map(r => this.tokenizerService.generateGenericTokens(r)))
    ).subscribe(t => {
      this.data = t;
    });
  }

}
