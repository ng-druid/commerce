import { Component, Input } from '@angular/core';
import { Ad} from '@classifieds-ui/ads';

@Component({
  selector: 'classifieds-ui-ad-master',
  templateUrl: './ad-master.component.html',
  styleUrls: ['./ad-master.component.scss']
})
export class AdMasterComponent {
  @Input()
  ads: Ad[] = [];
}
