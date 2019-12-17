import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'classifieds-ui-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  messages = [];
  sendMessage(event) {
    console.log(event);
  }
  constructor() { }

  ngOnInit() {
  }

}
