import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-ad-search-bar',
  templateUrl: './ad-search-bar.component.html',
  styleUrls: ['./ad-search-bar.component.scss']
})
export class AdSearchBarComponent implements AfterViewInit {
  searchString = '';

  @Output()
  searchChange = new EventEmitter<string>();

  @ViewChild('searchField', { static: true })
  private searchField: ElementRef<HTMLInputElement>;

  private keyupSubscription: Subscription;

  ngAfterViewInit() {
    this.keyupSubscription = fromEvent(this.searchField.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    ).subscribe(() => this.onSubmit());
  }

  onSubmit() {
    this.searchChange.emit(this.searchString);
  }
}
