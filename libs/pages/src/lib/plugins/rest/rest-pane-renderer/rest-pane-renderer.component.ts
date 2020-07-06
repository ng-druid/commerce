import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { RestContentHandler } from '../../../handlers/rest-content-handler.service';
import { switchMap } from 'rxjs/operators';
import { ControlContainer } from '@angular/forms';
import { SelectOption } from '../../../models/plugin.models';

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

  get renderType() {
    return this.restHandler.getRenderType(this.settings);
  }

  constructor(
    private restHandler: RestContentHandler,
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    const tag = `data_${RestPaneRendererComponent.counter++}`;
    this.restHandler.toObject(this.settings).pipe(
      switchMap(r => this.restHandler.buildSelectOptionItems(this.settings, new Map<string, any>([ ['tag', tag], [ 'snippet', r.renderer.data ] ])))
    ).subscribe(options => {
      this.options = options;
    });
  }

}
