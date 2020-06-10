import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { iif, of, EMPTY, forkJoin } from 'rxjs';
import { map, filter, switchMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { MEDIA_SETTINGS, MediaSettings } from '@classifieds-ui/media';
import { CitiesService, City } from '@classifieds-ui/cities';
import { AdType, Ad, AdTypePlugin } from '../../models/ads.models';
import { createAdTypePlugin } from '../../ad.helpers';
import { AdTypePluginsService } from '../../services/ad-type-plugins.service';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss'],
  providers: [ AdTypePluginsService ]
})
export class AdDetailComponent implements OnInit {
  ad: Ad;
  city: string;
  displayOverlay = true;
  displayGalleryTab = false;
  mediaBaseUrl: string;
  selectedTabIndex = 0;
  adType: AdType;
  plugin: AdTypePlugin;
  private adsService: EntityCollectionService<Ad>;
  private adTypesService: EntityCollectionService<AdType>;
  constructor(@Inject(MEDIA_SETTINGS) private mediaSettings: MediaSettings, private mo: MediaObserver, private route: ActivatedRoute, private citiesService: CitiesService, private adTypePlugins: AdTypePluginsService, es: EntityServices) {
    this.adsService = es.getEntityCollectionService('Ad');
    this.adTypesService = es.getEntityCollectionService('AdType');
  }
  ngOnInit() {
    this.mediaBaseUrl = this.mediaSettings.imageUrl;
    this.route.paramMap.pipe(
      map(p => p.get('adId')),
      filter(adId => typeof(adId) === 'string'),
      tap(() => this.displayOverlay = true),
      switchMap(adId => this.adsService.getByKey(adId).pipe(
        switchMap(ad => this.adTypesService.getAll().pipe(
          map(types => types.find(t => t.id === ad.typeId)),
          map<AdType, [Ad, AdType]>(adType => [ad, adType])
        ))
      )), /*.pipe(
        switchMap(ad =>
          ad.location && ad.location.length === 2 ?
          this.citiesService.getWithQuery({ lat: `${ad.location[1]}`, lng: `${ad.location[0]}`}).pipe(
            map(cities => cities.length > 0 ? cities[0] : undefined),
            map(city => [ad, city])
          ) : of([ad])
        )
      )*/
    ).subscribe(([ad, adType]) => {
      this.adType = adType;
      this.plugin = this.adTypePlugins.get(adType.name) ?? createAdTypePlugin(adType.name);
      this.displayOverlay = false;
      this.selectedTabIndex = 0;
      this.ad = new Ad(ad as Ad);
      this.city = ad.cityDisplay;
    });
    // this.displayGalleryTab = true;
    this.mo.asObservable().pipe(
      map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)
    ).subscribe(desktop => {
      this.displayGalleryTab = !desktop;
    });
  }
}
