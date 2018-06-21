import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/data/message.service';

@Component({
  selector: 'wari-shell-notification',
  templateUrl: './shell-notification.component.html',
  styleUrls: ['./shell-notification.component.scss']
})
export class ShellNotificationComponent implements OnInit {
  notifications: any[];
  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.notifications = this.messageService.get();
  }

}
