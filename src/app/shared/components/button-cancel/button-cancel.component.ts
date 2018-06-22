import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'wari-button-cancel',
  templateUrl: './button-cancel.component.html',
  styleUrls: ['./button-cancel.component.scss']
})
export class ButtonCancelComponent implements OnInit {

  @Output()
  wariOnCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
  }
  
  cancel() {
    this.wariOnCancel.emit(true);
  }

}
