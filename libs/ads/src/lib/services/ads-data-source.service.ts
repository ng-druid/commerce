import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Ad, SearchConfig } from '../models/ads.models';
import { AdsFacade } from '../+state/ads.facade';
import { AdSearchBarForm } from '../models/form.models';

@Injectable()
export class AdsDataSourceService extends DataSource<Ad> {
  private dataStream = new BehaviorSubject<Array<Ad>>([]);
  private subscription = new Subscription();
  private cachedData: Array<Ad> = [];
  private pageSize = 25;
  private lastPage = 0;
  private searchConfig = new SearchConfig({ searchString: '', page: '1', location: '' });
  constructor(private adsFacade: AdsFacade) {
    super();
    this.adsFacade.loadAll(this.searchConfig);
    this.adsFacade.allAds$.subscribe(ads => {
      this.cachedData = this.cachedData.concat(ads);
      this.dataStream.next(this.cachedData);
    });
  }

  set searchForm(searchForm: AdSearchBarForm | undefined) {
    this.cachedData = [];
    this.lastPage = 0;
    const location = searchForm.location === undefined || searchForm.location.length !== 2 ? '' : searchForm.location.join(",");
    this.searchConfig = new SearchConfig({ ...this.searchConfig, page: '1', searchString: searchForm.searchString, location });
    this.adsFacade.loadAll(this.searchConfig);
  }

  connect(collectionViewer: CollectionViewer): Observable<Array<Ad>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const currentPage = Math.floor(range.end / this.pageSize);
      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this.searchConfig = new SearchConfig({ ...this.searchConfig, page: `${currentPage}` });
        this.adsFacade.loadAll(this.searchConfig);
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }
}
