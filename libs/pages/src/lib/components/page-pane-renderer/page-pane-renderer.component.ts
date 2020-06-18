import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-page-pane-renderer',
  templateUrl: './page-pane-renderer.component.html',
  styleUrls: ['./page-pane-renderer.component.scss']
})
export class PagePaneRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];



  constructor() { }

  ngOnInit(): void {
  }

}
