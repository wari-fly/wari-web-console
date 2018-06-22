import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wari-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss']
})
export class ButtonAddComponent implements OnInit {

  @Input()
  wariForm: FormGroup;

  @Input()
  working = false;

  @Output()
  wariOnSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  save() {
    if (!this.wariForm.valid) {
      this.wariOnSave.emit(true);
    } else {
      this.wariOnSave.emit(false);
    }
  }

}
