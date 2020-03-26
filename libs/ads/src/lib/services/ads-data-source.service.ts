import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { QueryParams } from '@ngrx/data';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Ad, SearchConfig, AdTypes } from '../models/ads.models';
import { AdSearchBarForm } from '../models/form.models';
import { AdListItemService } from './ad-list-item.service';

@Injectable()
export class AdsDataSourceService extends DataSource<Ad> {
  private dataStream = new BehaviorSubject<Array<Ad>>([]);
  private subscription = new Subscription();
  private pageSize = 25;
  private lastPage = 0;
  private searchConfig;
  constructor(private adListItemService: AdListItemService) {
    super();
    this.adListItemService.entities$.subscribe(ads => {
      this.dataStream.next(ads);
    });
  }

  set searchForm(searchForm: AdSearchBarForm | undefined) {
    this.lastPage = 0;
    const location = searchForm.location === undefined || searchForm.location.length !== 2 ? '' : searchForm.location.join(",");
    this.searchConfig = new SearchConfig({ ...this.searchConfig, page: '1', searchString: searchForm.searchString, location, features: searchForm.features, adType: this.mapAdType(searchForm.adType) });
    this.adListItemService.clearCache();
    this.query();
  }

  connect(collectionViewer: CollectionViewer): Observable<Array<Ad>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const currentPage = Math.ceil((range.end + 1) / this.pageSize);
      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this.searchConfig = new SearchConfig({ ...this.searchConfig, page: `${currentPage}` });
        this.query();
      }
    }));
    return this.dataStream;
  }

  query() {
    this.adListItemService.getWithQuery(this.searchConfig as Object as QueryParams);
  }

  mapAdType(adType: string): number {
    // @todo: This should be reusable.
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
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }
}
