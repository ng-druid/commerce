import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { Pane } from '../../../models/page.models';

@Component({
  selector: 'classifieds-ui-virtual-list-panel-renderer',
  templateUrl: './virtual-list-panel-renderer.component.html',
  styleUrls: ['./virtual-list-panel-renderer.component.scss']
})
export class VirtualListPanelRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  panes: Array<Pane> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
