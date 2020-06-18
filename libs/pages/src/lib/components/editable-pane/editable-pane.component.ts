import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-editable-pane',
  templateUrl: './editable-pane.component.html',
  styleUrls: ['./editable-pane.component.scss']
})
export class EditablePaneComponent implements OnInit, OnChanges {

  @Input()
  providerName: string;

  @Input()
  settings: Array<AttributeValue> = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  edit() {
    alert('edit');
  }

  delete() {
    alert('delete');
  }

}
