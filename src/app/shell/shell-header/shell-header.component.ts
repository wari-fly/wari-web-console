import { Component, OnInit } from '@angular/core';
import { MessageHistory } from '../../core/model/message-history';
import { MessageService } from '../../core/data/message.service';

@Component({
  selector: 'wari-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {
  messageHistory: MessageHistory[];
  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.messageHistory = this.messageService.getHistory();
  }

}
