import { Component, OnInit } from '@angular/core';
import { VocabularyListItem, VocabularyListItemService } from '@classifieds-ui/taxonomy';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthFacade } from '@classifieds-ui/auth';

@Component({
  selector: 'classifieds-ui-vocabulary-master',
  templateUrl: './vocabulary-master.component.html',
  styleUrls: ['./vocabulary-master.component.scss']
})
export class VocabularyMasterComponent implements OnInit {
  vocabularies$: Observable<Array<VocabularyListItem>>;
  loading$: Observable<boolean>;
  displayOverlay = false;

  constructor(private vocabularyListItemService: VocabularyListItemService, private authFacade: AuthFacade) { }

  ngOnInit() {
    this.vocabularies$ = this.vocabularyListItemService.getAll().pipe(
      withLatestFrom(this.authFacade.getUser$),
      map(([vocabs, user]) => {
        const v = [];
        vocabs.forEach(vocab => {
          if(user && vocab.userId === user.profile.sub) {
            v.push(vocab);
          }
        })
        return v;
      })
    );
    this.loading$ = this.vocabularyListItemService.loading$;
  }

}
