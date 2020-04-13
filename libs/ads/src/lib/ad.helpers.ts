import { AdTypes, AdTypePlugin } from './models/ads.models';
import { AdListItemDefaultComponent } from './components/ad-list-item-default/ad-list-item-default.component';

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

export const createAdTypePlugin = (adTypeId: number) => {
  return new AdTypePlugin({
    adTypeId: adTypeId,
    listItemDisplay: AdListItemDefaultComponent
  });
};
