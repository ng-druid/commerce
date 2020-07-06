import { Component, OnInit, Input } from '@angular/core';
import * as uuid from 'uuid';
import { AttributeValue } from '@classifieds-ui/attributes';
import { RestContentHandler } from '../../../handlers/rest-content-handler.service';
import { Subject } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';
import { ControlContainer } from '@angular/forms';
import { SelectOption, Snippet } from '../../../models/plugin.models';
import { SnippetPaneRendererComponent } from '../../snippet/snippet-pane-renderer/snippet-pane-renderer.component';

@Component({
  selector: 'classifieds-ui-rest-pane-renderer',
  templateUrl: './rest-pane-renderer.component.html',
  styleUrls: ['./rest-pane-renderer.component.scss']
})
export class RestPaneRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  displayType: string;

  tag = uuid.v4();

  options: Array<SelectOption>;

  searchChange$ = new Subject<string>();

  snippet: Snippet;

  get renderType() {
    return this.restHandler.getRenderType(this.settings);
  }

  constructor(
    private restHandler: RestContentHandler,
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.restHandler.toObject(this.settings).pipe(
      tap(r => this.snippet = r.renderer.data),
      filter(() => this.renderType !== 'autocomplete'),
      switchMap(r => this.restHandler.buildSelectOptionItems(this.settings, new Map<string, any>([ ['tag', this.tag], [ 'snippet', r.renderer.data ] ])))
    ).subscribe(options => {
      this.options = options;
    });
    this.searchChange$.pipe(
      switchMap(r => this.restHandler.buildSelectOptionItems(this.settings, new Map<string, any>([ ['tag', uuid.v4()], [ 'snippet', this.snippet ] ])))
    ).subscribe(options => {
      this.options = options;
    });
  }

  onSearchChange(searchString: string) {
    this.searchChange$.next(searchString);
  }

}
