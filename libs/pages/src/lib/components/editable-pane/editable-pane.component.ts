import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject, EventEmitter, Output } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentProvider, CONTENT_PROVIDER } from '@classifieds-ui/content';

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

  @Output()
  edit = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  contentProvider: ContentProvider;

  private contentProviders: Array<ContentProvider> = [];

  constructor(@Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
    this.contentProvider = this.contentProviders.find(p => p.name === this.providerName);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contentProvider = this.contentProviders.find(p => p.name === this.providerName);
  }

  onEditClick() {
    this.edit.emit();
  }

  onDeleteClick() {
    this.delete.emit();
  }

}
