import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { Store } from '@ngrx/store';
import { PageBuilderFacade } from '../../../features/page-builder/page-builder.facade';
import { RestContentHandler } from '../../../handlers/rest-content-handler.service';

@Component({
  selector: 'classifieds-ui-rest-pane-renderer',
  templateUrl: './rest-pane-renderer.component.html',
  styleUrls: ['./rest-pane-renderer.component.scss']
})
export class RestPaneRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];

  constructor(private pageBuilderFacade: PageBuilderFacade, private restHandler: RestContentHandler) { }

  ngOnInit(): void {
    //this.pageBuilderFacade.loadRestData();
    this.restHandler.toObject(this.settings).subscribe(r => {
      console.log(r);
    });
  }

}
