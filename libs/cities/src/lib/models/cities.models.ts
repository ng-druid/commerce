export class CitiesSettings {
  endpointUrl: string;
  constructor(data?: CitiesSettings) {
    if(data) {
      this.endpointUrl = data.endpointUrl;
    }
  }
}

export class City {
  sourceId: string;
  city: string;
  stateId: string;
  stateName: string;
  countyName: string;
  population: number;
  zip: string;
  location: Array<number>;
  constructor(data?: City) {
    if (data) {
      this.sourceId = data.sourceId;
      this.city = data.city;
      this.stateId = data.stateId;
      this.stateName = data.stateName;
      this.countyName = data.countyName;
      this.population = data.population;
      this.zip = data.zip;
      this.location = data.location;
    }
  }
}

export class CityListItem extends City {

}
