import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ad} from '@classifieds-ui/ads';

@Component({
  selector: 'classifieds-ui-ad-master',
  templateUrl: './ad-master.component.html',
  styleUrls: ['./ad-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdMasterComponent {
  @Input()
  ads: Ad[] = [];
  constructor(private router: Router) { }
  viewAd(id: string) {
    this.router.navigateByUrl(`/ad/${id}`);
  }
}
