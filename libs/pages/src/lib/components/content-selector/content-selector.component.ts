import { Component, OnInit, Inject, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CONTENT_PLUGIN, ContentPlugin, ContentInstance } from '@classifieds-ui/content';
import { ContentSelectionHostDirective } from '../../directives/content-selection-host.directive';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'classifieds-ui-content-selector',
  templateUrl: './content-selector.component.html',
  styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {

  selectedIndex = 0
  plugin: ContentPlugin;

  contentPlugins: Array<ContentPlugin> = [];

  @ViewChild(ContentSelectionHostDirective, {static: true}) selectionHost: ContentSelectionHostDirective;

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public panelFormGroup: FormGroup,
    private bottomSheetRef: MatBottomSheetRef<ContentSelectorComponent>,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private pageBuilderFacade: PageBuilderFacade,
    private fb: FormBuilder
  ) {
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
  }

  onEntitySelected(plugin: ContentPlugin) {
    this.plugin = plugin;
    if(this.plugin.selectionComponent !== undefined) {
      this.selectedIndex = 1;
      this.renderSelectionComponent();
    } else if(this.plugin.editorComponent !== undefined) {
      this.bottomSheetRef.dismiss();
      const dialogRef = this.dialog.open(this.plugin.editorComponent, { data: this.panelFormGroup });
    } else {
      (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
        contentProvider: this.plugin.name,
        settings: this.fb.array([])
      }));
      this.pageBuilderFacade.addContentInstance(new ContentInstance({ pluginName: this.plugin.name, settings: [] }));
    }
  }

  renderSelectionComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.plugin.selectionComponent);

    const viewContainerRef = this.selectionHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).panelFormGroup = this.panelFormGroup;

  }

}
