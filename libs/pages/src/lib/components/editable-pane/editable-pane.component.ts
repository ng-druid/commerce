import { Component, OnInit, Input, Inject } from '@angular/core';
import { ContentInstance, ContentProvider } from '@classifieds-ui/content';

@Component({
  selector: 'classifieds-ui-editable-pane',
  templateUrl: './editable-pane.component.html',
  styleUrls: ['./editable-pane.component.scss']
})
export class EditablePaneComponent implements OnInit {

  @Input()
  contentInstance: ContentInstance;

  @Input()
  contentProvider: ContentProvider;

  constructor() { }

  ngOnInit(): void {
  }

}
