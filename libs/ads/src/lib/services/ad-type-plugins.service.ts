import { Inject, Optional } from '@angular/core';
import { Injectable } from '@angular/core';
import { AD_TYPE_PLUGIN } from '../ad.tokens';
import { AdTypePlugin } from '../models/ads.models';

@Injectable()
export class AdTypePluginsService {
  constructor(@Optional() @Inject(AD_TYPE_PLUGIN) private plugins: Array<AdTypePlugin>) { }
  get(adType: string): AdTypePlugin {
    return this.plugins ? this.plugins.find(p => p.adType === adType) : undefined;
  }
}
