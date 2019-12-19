export class AdSearchBarForm {
  searchString: string;
  location: Array<number>;
  constructor(data?: AdSearchBarForm) {
    if(data) {
      this.searchString = data.searchString;
      this.location = data.location;
    }
  }
}
