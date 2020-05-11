export enum ProfileStatuses {
  Submitted = 0,
  Approved = 1,
  Rejected = 2,
  Deleted = 3,
}

export enum ProfileTypes {
  Person = 0,
  Company = 1,
  Shop = 2,
}

export enum ProfileSubtypes {
  Agent = 0,
  Broker = 1,
  Dealer = 2,
  Seller = 3,
}

export enum AdTypes {
  General = 0,
  RealEstate = 1,
  Rental = 2,
  Auto = 3,
  Job = 4,
}

export enum PhoneNumberTypes {
  Email = 0,
  Fax = 1,
}

export enum LocationTypes {
  Home = 0,
  Office = 1,
}

export class ProfileSettings {
  profileUrl: string;
  constructor(data?: ProfileSettings) {
    if(data) {
      this.profileUrl = data.profileUrl;
    }
  }
}

export class ProfileImage {
  id: string;
  path: string;
  weight: number;

  constructor(data?: ProfileImage) {
      if (data) {
          for (const property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }
}

export class PhoneNumber {
  type: PhoneNumberTypes;
  value: string;
  constructor(data?: PhoneNumber) {
      if (data) {
          for (const property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }
}

export class Location {
  title: string;
  type: LocationTypes;
  address: Address;
  phoneNumbers: PhoneNumber[] | undefined;
  constructor(data?: Location) {
      if (data) {
          for (const property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }
}

export class Address {
  street1: string;
  street2: string | undefined;
  street3: string | undefined;
  city: string;
  state: string;
  zip: string;
  country: string;
  constructor(data?: Address) {
      if (data) {
          for (const property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }
}

export class Profile {
  id: string;
  parentId: string | undefined;
  userId: string;
  title: string;
  status: ProfileStatuses;
  type: ProfileTypes;
  subtype: ProfileSubtypes;
  adspace: AdTypes;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
  preferredName: string | undefined;
  companyName: string | undefined;
  email: string | undefined;
  introduction: string | undefined;
  logo: ProfileImage | undefined;
  headshot: ProfileImage | undefined;
  phoneNumbers: PhoneNumber[] | undefined;
  locations: Location[] | undefined;
  constructor(data?: Profile) {
      if (data) {
          for (const property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }
}

export class ProfileListItem extends Profile {
}
