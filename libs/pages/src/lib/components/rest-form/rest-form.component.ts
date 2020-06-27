import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NEVER } from 'rxjs';
import { debounceTime, filter, map, switchMap, catchError, tap } from 'rxjs/operators';
import { DatasourceApiService } from '../../services/datasource-api.service';
import { SnippetContentHandler } from '../../handlers/snippet-content.handler';
import { Snippet } from '../../models/page.models';
import { TokenizerService } from '@classifieds-ui/token';
import * as qs from 'qs';

@Component({
  selector: 'classifieds-ui-rest-form',
  templateUrl: './rest-form.component.html',
  styleUrls: ['./rest-form.component.scss']
})
export class RestFormComponent implements OnInit {

  flags = new Map<string, string>();

  contexts = [];
  forms = [];

  tokens: Map<string, any>;

  jsonData: Array<any>;

  restForm = this.fb.group({
    url: this.fb.control('', Validators.required),
    params: this.fb.array([])
  });

  get params(): FormArray {
    return this.restForm.get('params') as FormArray;
  }

  get flagsAsArray(): Array<string> {
    const flags = [];
    this.flags.forEach((f, k) => {
      flags.push(k);
    });
    return flags;
  }

  constructor(
    private fb: FormBuilder,
    private datasourceApi: DatasourceApiService,
    private snippetHandler: SnippetContentHandler,
    private tokenizerService: TokenizerService
  ) {
    this.flags.set('page', 'Page');
    this.flags.set('limit', 'Limit');
    this.flags.set('offset', 'Offset');
  }

  ngOnInit(): void {
    this.restForm.get('url').valueChanges.pipe(
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
              context: this.fb.control('')
            }),
            flags: this.fb.array(this.flagsAsArray.map(k => this.fb.group({
              enabled: this.fb.control(false)
            })))
          }));
        }
      }
    });
    this.restForm.valueChanges.pipe(
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
      this.tokens = this.tokenizerService.generateGenericTokens(data[0]);
    });
  }

  paramName(index: number) {
    const url = this.restForm.get('url').value;
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
    const url = this.restForm.get('url').value;
    if(url.indexOf('?') === -1) {
      return url;
    }
    const parsed = qs.parse(url.substring(url.indexOf('?') + 1));
    const params = this.params.controls.reduce<any>((p, c, i) => ({ ...p, [this.paramName(i)]: c.get('mapping').get('value').value }), {});
    const apiUrl = url.substring(0, url.indexOf('?') + 1) + qs.stringify({ ...parsed, ...params });
    return apiUrl;
  }

  submit() {
    console.log(this.restForm.value);
  }

}
