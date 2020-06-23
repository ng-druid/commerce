import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-panel-page-router',
  templateUrl: './panel-page-router.component.html',
  styleUrls: ['./panel-page-router.component.scss']
})
export class PanelPageRouterComponent implements OnInit {

  panelPageId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(p => p.get('panelPageId')),
      filter(id => id !== undefined),
      distinctUntilChanged(),
    ).subscribe(id => {
      this.panelPageId = id;
    });
  }

}
