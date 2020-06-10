import { AdTypes, AdTypePlugin } from './models/ads.models';
import { AdListItemComponent } from './components/ad-list-item/ad-list-item.component';

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

export const createAdTypePlugin = (adType: string) => {
  return new AdTypePlugin({
    adType: adType,
    listItemDisplay: AdListItemComponent
  });
};
