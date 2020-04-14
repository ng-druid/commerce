import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Ad, SearchConfig, AdListItem } from '../models/ads.models';
import { AdSearchBarForm } from '../models/form.models';
import { mapAdType } from '../ad.helpers';
import * as qs from 'qs';

@Injectable()
export class AdsDataSourceService extends DataSource<Ad> {
  private dataStream = new BehaviorSubject<Array<Ad>>([]);
  private subscription = new Subscription();
  private pageSize = 25;
  //private pageSize = 4;
  private lastPage = 0;
  private searchConfig: SearchConfig;
  private adListItemsService: EntityCollectionService<AdListItem>;
  constructor(es: EntityServices) {
    super();
    this.adListItemsService = es.getEntityCollectionService('AdListItem');
    this.adListItemsService.entities$.subscribe(ads => {
      this.dataStream.next(ads);
    });
  }

  set searchForm(searchForm: AdSearchBarForm | undefined) {
    this.lastPage = 0;
    const location = searchForm.location === undefined || searchForm.location.length !== 2 ? '' : searchForm.location.join(",");
    this.searchConfig = new SearchConfig({ ...this.searchConfig, page: '1', searchString: searchForm.searchString, location, features: searchForm.features, adType: mapAdType(searchForm.adType), attributes: searchForm.attributes });
    this.adListItemsService.clearCache();
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
    this.adListItemsService.getWithQuery(qs.stringify(this.searchConfig as Object));
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }
}
