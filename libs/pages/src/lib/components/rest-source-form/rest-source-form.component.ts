import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, Validator, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';
import { NEVER } from 'rxjs';
import { debounceTime, filter, map, switchMap, catchError, tap } from 'rxjs/operators';
import { DatasourceApiService } from '../../services/datasource-api.service';
import * as qs from 'qs';

@Component({
  selector: 'classifieds-ui-rest-source-form',
  templateUrl: './rest-source-form.component.html',
  styleUrls: ['./rest-source-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RestSourceFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RestSourceFormComponent),
      multi: true
    },
  ]
})
export class RestSourceFormComponent implements OnInit, ControlValueAccessor, Validator {

  @Output()
  dataChange = new EventEmitter<any>();

  flags = new Map<string, string>();

  sourceForm = this.fb.group({
    url: this.fb.control('', Validators.required),
    params: this.fb.array([]),
  });

  jsonData: Array<any>;

  public onTouched: () => void = () => {};

  get params(): FormArray {
    return this.sourceForm.get('params') as FormArray;
  }

  get flagsAsArray(): Array<string> {
    const flags = [];
    this.flags.forEach((f, k) => {
      flags.push(k);
    });
    return flags;
  }

  constructor(private fb: FormBuilder, private datasourceApi: DatasourceApiService,) {
    this.flags.set('page', 'Page');
    this.flags.set('limit', 'Limit');
    this.flags.set('offset', 'Offset');
    this.flags.set('searchString', 'Search String');
  }

  ngOnInit(): void {
    this.sourceForm.get('url').valueChanges.pipe(
      debounceTime(500),
      filter(v => v.indexOf('?') > -1),
      map(v => v.substring(v.indexOf('?') + 1))
    ).subscribe(queryString => {
      const parsed = qs.parse(queryString);
      this.params.clear();
      for(const param in parsed) {
        if(parsed[param].indexOf(':') === 0) {
          this.params.push(this.fb.group({
            mapping: this.fb.group({
              type: this.fb.control('', Validators.required),
              value: this.fb.control('', Validators.required),
              testValue: this.fb.control(''),
              context: this.fb.control('')
            }),
            flags: this.fb.array(this.flagsAsArray.map(k => this.fb.group({
              name: k,
              enabled: this.fb.control(false)
            })))
          }));
        }
      }
    });
    this.sourceForm.valueChanges.pipe(
      debounceTime(1000),
      map(() => this.generateUrl()),
      tap(v => console.log(v)),
      switchMap((url: string) => this.datasourceApi.getData(url).pipe(
        catchError((e: HttpErrorResponse) => {
          console.log(e);
          return NEVER;
        })
      ))
    ).subscribe(data => {
      this.jsonData = data;
      this.dataChange.emit(data);
    });
  }

  writeValue(val: any): void {
    if (val) {
      this.sourceForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.sourceForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.sourceForm.disable()
    } else {
      this.sourceForm.enable()
    }
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.sourceForm.valid ? null : { invalidForm: {valid: false, message: "source is invalid"}};
  }

  paramName(index: number) {
    const url = this.sourceForm.get('url').value;
    const parsed = qs.parse(url.substring(url.indexOf('?') + 1));
    let i = 0;
    for(const param in parsed) {
      if(parsed[param].indexOf(':') === 0) {
        if(i === index) {
          return param;
        }
        i++;
      }
    }
  }

  generateUrl(): string {
    const url = this.sourceForm.get('url').value;
    if(url.indexOf('?') === -1) {
      return url;
    }
    const parsed = qs.parse(url.substring(url.indexOf('?') + 1));
    const params = this.params.controls.reduce<any>((p, c, i) => ({ ...p, [this.paramName(i)]: (c.get('mapping').get('value').value === 'static' ? c.get('mapping').get('value').value : c.get('mapping').get('testValue').value) }), {});
    const apiUrl = url.substring(0, url.indexOf('?') + 1) + qs.stringify({ ...parsed, ...params });
    return apiUrl;
  }

}
