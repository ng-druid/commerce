import { Component, OnInit, Inject } from '@angular/core';
import { ATTRIBUTE_WIDGET, AttributeWidget } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-attribute-selector',
  templateUrl: './attribute-selector.component.html',
  styleUrls: ['./attribute-selector.component.scss']
})
export class AttributeSelectorComponent implements OnInit {

  private attributeWidgets: Array<AttributeWidget> = [];

  constructor(@Inject(ATTRIBUTE_WIDGET) attributeWidgets: Array<AttributeWidget>) {
    this.attributeWidgets = attributeWidgets;
  }

  ngOnInit(): void {
    console.log(this.attributeWidgets);
  }

}
