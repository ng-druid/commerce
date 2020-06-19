import { Component, OnInit } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { Layout } from '../../models/page.models';

@Component({
  selector: 'classifieds-ui-create-layout',
  templateUrl: './create-layout.component.html',
  styleUrls: ['./create-layout.component.scss']
})
export class CreateLayoutComponent implements OnInit {

  private layoutService: EntityCollectionService<Layout>;

  constructor(es: EntityServices) {
    this.layoutService = es.getEntityCollectionService('Layout');
  }

  ngOnInit(): void {
  }

  saved(layout: Layout) {
    this.layoutService.add(layout).subscribe(() => {
      alert('layout added');
    })
  }

}
