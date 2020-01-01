export class CitiesSettings {
  endpointUrl: string;
  constructor(data?: CitiesSettings) {
    if(data) {
      this.endpointUrl = data.endpointUrl;
    }
  }
}

export class CityListItem {
  sourceId: string;
  city: string;
  stateId: string;
  stateName: string;
  countyName: string;
  population: number;
  location: Array<number>;
  constructor(data?: CityListItem) {
    if (data) {
      this.sourceId = data.sourceId;
      this.city = data.city;
      this.stateId = data.stateId;
      this.stateName = data.stateName;
      this.countyName = data.countyName;
      this.population = data.population;
      this.location = data.location;
    }
  }
}
