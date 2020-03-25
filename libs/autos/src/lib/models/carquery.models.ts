export class Make {
  id: string;
  display: string;
  common: boolean;
  country: string;
  constructor(data?: Make) {
    if (data) {
      this.id = data.id;
      this.display = data.display;
      this.common = data.common;
      this.country = data.country;
    }
  }
}

export class Model {
  name: string;
  makeId: string;
  constructor(data?: Model) {
    if (data) {
      this.name = data.name;
      this.makeId = data.makeId;
    }
  }
}
