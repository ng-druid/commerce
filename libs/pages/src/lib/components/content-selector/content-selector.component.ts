import { Component, OnInit, Inject, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CONTENT_PROVIDER, ContentProvider, ContentInstance } from '@classifieds-ui/content';
import { ContentSelectionHostDirective } from '../../directives/content-selection-host.directive';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'classifieds-ui-content-selector',
  templateUrl: './content-selector.component.html',
  styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {

  selectedIndex = 0
  provider: ContentProvider;

  contentProviders: Array<ContentProvider> = [];

  @ViewChild(ContentSelectionHostDirective, {static: true}) selectionHost: ContentSelectionHostDirective;

  constructor(
    @Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public panelFormGroup: FormGroup,
    private componentFactoryResolver: ComponentFactoryResolver,
    private pageBuilderFacade: PageBuilderFacade,
    private fb: FormBuilder
  ) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
  }

  onEntitySelected(provider: ContentProvider) {
    this.provider = provider;
    if(this.provider.selectionComponent !== undefined) {
      this.selectedIndex = 1;
      this.renderSelectionComponent();
    } else {
      (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
        contentProvider: this.provider.name,
        settings: this.fb.array([])
      }));
      this.pageBuilderFacade.addContentInstance(new ContentInstance({ providerName: this.provider.name, settings: [] }));
    }
  }

  renderSelectionComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.provider.selectionComponent);

    const viewContainerRef = this.selectionHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).panelFormGroup = this.panelFormGroup;

  }

}
