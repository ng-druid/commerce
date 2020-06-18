import { Component, OnInit, Input } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { Page } from '../../models/page.models';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { Observable } from 'rxjs';
import { ContentInstance } from '@classifieds-ui/content';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AttributeTypes } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss']
})
export class PageSelectorComponent implements OnInit {

  @Input()
  panelFormGroup: FormGroup;

  pages$: Observable<Array<Page>>;

  private pagesService: EntityCollectionService<Page>;

  constructor(es: EntityServices, private pageBuilderFacade: PageBuilderFacade, private fb: FormBuilder) {
    this.pagesService = es.getEntityCollectionService('Page');
  }

  ngOnInit(): void {
    this.pages$ = this.pagesService.getWithQuery({ site: "main" });
  }

  onItemSelect(page: Page) {
    (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
      contentProvider: 'page',
      settings: this.fb.array([
        this.fb.group({
          name: new FormControl('path', Validators.required),
          type: new FormControl(AttributeTypes.Text, Validators.required),
          displayName: new FormControl('Path', Validators.required),
          value: new FormControl(page.path, Validators.required),
        })
      ])
    }));
    this.pageBuilderFacade.addContentInstance(new ContentInstance({ providerName: 'page' }));
  }

}
