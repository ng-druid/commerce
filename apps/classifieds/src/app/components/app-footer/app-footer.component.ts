import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'classifieds-ui-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent {
  messages = [];
  sendMessage(event) {
    console.log(event);
  }
}
