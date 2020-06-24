import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlContainer, FormArray } from "@angular/forms";
import { Attribute } from '../../models/attributes.models';
import { CarQueryService } from '../../services/car-query.service';
import { Observable, BehaviorSubject, Subject, iif, of } from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Make, Model } from '../../models/carquery.models';

@Component({
  selector: 'classifieds-ui-ymm-selector',
  templateUrl: './ymm-selector.component.html',
  styleUrls: ['./ymm-selector.component.scss']
})
export class YmmSelectorComponent implements OnInit, OnDestroy {

  @Input()
  attribute: Attribute;

  years$ = new BehaviorSubject<Array<string>>([]);
  makes$ = new BehaviorSubject<Array<Make>>([]);
  models$ = new BehaviorSubject<Array<Model>>([]);

  componentDestroyed = new Subject();

  get attributes(): FormArray {
    return this.controlContainer.control.get('attributes') as FormArray;
  }

  constructor(private carQueryService: CarQueryService, public controlContainer: ControlContainer) { }

  ngOnInit() {
    this.carQueryService.getYears().pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map(y => y.map(y2 => `${y2}`)),
      takeUntil(this.componentDestroyed)
    ).subscribe(years => {
      this.years$.next(years);
    });
    this.attributes.controls[0].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => {
        this.attributes.controls[1].get('value').reset();
        this.attributes.controls[2].get('value').reset();
        this.models$.next([]);
        this.makes$.next([]);
      }),
      switchMap(v => this.carQueryService.getMakes(v.value)),
      takeUntil(this.componentDestroyed)
    ).subscribe(makes => {
      this.makes$.next(makes);
    });
    this.attributes.controls[1].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => {
        this.attributes.controls[2].get('value').reset();
        this.models$.next([]);
      }),
      switchMap(v => this.carQueryService.getModels(this.attributes.controls[0].get('value').value, v.value)),
      takeUntil(this.componentDestroyed)
    ).subscribe(models => {
      this.models$.next(models);
    });
    if(this.attributes.controls[0].get('value').value) {
      this.carQueryService.getMakes(this.attributes.controls[0].get('value').value).pipe(
        switchMap(makes => iif(
          () => this.attributes.controls[1].get('value').value,
          this.carQueryService.getModels(this.attributes.controls[0].get('value').value, this.attributes.controls[1].get('value').value).pipe(
            map(models => [makes, models])
          ),
          of().pipe(
            map(() => [makes, undefined])
          )
        ))
      ).subscribe(([makes, models]) => {
        this.makes$.next(makes as Make[]);
        if(models) {
          console.log(models);
          this.models$.next(models as Model[])
        }
      });
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}
