import { Component, OnInit, Inject, Input } from '@angular/core';
import { MEDIA_SETTINGS } from '../../media.tokens';
import { MediaSettings, MediaFile } from '../../models/media.models';
import { AttributeValue } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-media-pane-renderer',
  templateUrl: './media-pane-renderer.component.html',
  styleUrls: ['./media-pane-renderer.component.scss']
})
export class MediaPaneRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];

  mediaFile: MediaFile;
  mediaBaseUrl: string;

  constructor(@Inject(MEDIA_SETTINGS) private mediaSettings: MediaSettings) { }

  ngOnInit(): void {
    this.mediaBaseUrl = this.mediaSettings.imageUrl;
    this.mediaFile = new MediaFile({
      path: this.settings.find(s => s.name === 'path').value,
      contentType: this.settings.find(s => s.name === 'contentType').value,
      contentDisposition: this.settings.find(s => s.name === 'contentDisposition').value,
      id: this.settings.find(s => s.name === 'id').value,
      length: parseInt(this.settings.find(s => s.name === 'length').value),
      fileName: this.settings.find(s => s.name === 'fileName').value
    });
  }

  ngOnChanges(): void {
    this.mediaBaseUrl = this.mediaSettings.imageUrl;
    this.mediaFile = new MediaFile({
      path: this.settings.find(s => s.name === 'path').value,
      contentType: this.settings.find(s => s.name === 'contentType').value,
      contentDisposition: this.settings.find(s => s.name === 'contentDisposition').value,
      id: this.settings.find(s => s.name === 'id').value,
      length: parseInt(this.settings.find(s => s.name === 'length').value),
      fileName: this.settings.find(s => s.name === 'fileName').value
    });
  }

}
