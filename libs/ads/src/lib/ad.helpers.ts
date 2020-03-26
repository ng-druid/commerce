import { AdTypes } from './models/ads.models';

export const mapAdType = (adType: string): AdTypes => {
  switch(adType) {
    case 'general':
      return AdTypes.General;
    case 'realestate':
      return AdTypes.RealEstate;
    case 'rentals':
      return AdTypes.Rental;
    case 'autos':
      return AdTypes.Auto;
    case 'jobs':
      return AdTypes.Job;
  }
};
