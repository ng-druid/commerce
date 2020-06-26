import { Component, OnInit, Input, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { AttributeValue } from '@classifieds-ui/attributes';
import { PanelPage } from '../../../models/page.models';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { PanelContentHandler } from '../../../handlers/panel-content.handler';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { ContentSelectorComponent } from '../../../components/content-selector/content-selector.component';

@Component({
  selector: 'classifieds-ui-panel-selector',
  templateUrl: './panel-selector.component.html',
  styleUrls: ['./panel-selector.component.scss']
})
export class PanelSelectorComponent implements OnInit {

  @Input()
  panelFormGroup: FormGroup;

  panels: Array<string> = [
    'd45334a5-b70b-11ea-8743-9288aa7fe284'
  ];

  panelPagesService: EntityCollectionService<PanelPage>;

  private contentPlugin: ContentPlugin;

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private bottomSheetRef: MatBottomSheetRef<ContentSelectorComponent>,
    private handler: PanelContentHandler,
    private dialog: MatDialog,
    private fb: FormBuilder,
    es: EntityServices
  ) {
    this.panelPagesService = es.getEntityCollectionService('PanelPage');
    this.contentPlugin = contentPlugins.find(p => p.name === 'panel');
  }

  ngOnInit(): void {
  }

  onNewSelect() {
    const newPanel = new PanelPage({ id: undefined, gridItems: [], panels: [] });
    (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
      contentPlugin: 'panel',
      name: '',
      label: '',
      settings: this.fb.array(this.handler.buildSettings(newPanel).map(s => this.convertToGroup(s)))
    }));
    this.bottomSheetRef.dismiss();
  }

  onItemSelect(panel: string) {
    this.panelPagesService.getByKey(panel).subscribe(p => {
      //this.dialog.open(this.contentPlugin.editorComponent, { data: { panelFormGroup: this.panelFormGroup, pane: undefined, paneIndex: undefined, panelPage: p } });
      (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
        contentPlugin: 'panel',
        name: '',
        label: '',
        settings: this.fb.array(this.handler.buildSettings(p).map(s => this.convertToGroup(s)))
      }));
      this.bottomSheetRef.dismiss();
    });
  }

  convertToGroup(setting: AttributeValue): FormGroup {

    const fg = this.fb.group({
      name: new FormControl(setting.name, Validators.required),
      type: new FormControl(setting.type, Validators.required),
      displayName: new FormControl(setting.displayName, Validators.required),
      value: new FormControl(setting.value, Validators.required),
      computedValue: new FormControl(setting.value, Validators.required),
      attributes: new FormArray([])
    });

    if(setting.attributes && setting.attributes.length > 0) {
      setting.attributes.forEach(s => {
        (fg.get('attributes') as FormArray).push(this.convertToGroup(s));
      })
    }

    return fg;

  }

}
