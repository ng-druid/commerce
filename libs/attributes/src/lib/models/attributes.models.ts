export enum AttributeTypes {
  Number,
  Text
}

export class Attribute {
  name: string;
  type: AttributeTypes;
  label: string;
  required: boolean;
  attributes: Array<Attribute> = [];
  constructor(data?: Attribute) {
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.label = data.label;
      this.required = data.required;
      if (data.attributes) {
        this.attributes = data.attributes.map(a => new Attribute(a));
      }
    }
  }
}

export class AttributeValue {
  name: string;
  displayName: string;
  type: AttributeTypes;
  value: string;
  attributes: Array<AttributeValue> = [];
  constructor(data?: AttributeValue) {
    if (data) {
      this.name = data.name;
      this.displayName = data.displayName;
      this.type = data.type;
      this.value = data.value;
      if (data.attributes) {
        this.attributes = data.attributes.map(a => new AttributeValue(a));
      }
    }
  }
}
