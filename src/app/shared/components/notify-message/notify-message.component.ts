import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../core/data/notify.service';


@Component({
  selector: 'wari-notify-message',
  templateUrl: './notify-message.component.html',
  styleUrls: ['./notify-message.component.scss']
})
export class NotifyMessageComponent implements OnInit {

  constructor(public notify: NotifyService) { }

  ngOnInit() {
  }
}
