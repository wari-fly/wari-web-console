import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'wari-form-field-validation-messages',
  templateUrl: './form-field-validation-messages.component.html',
  styleUrls: ['./form-field-validation-messages.component.scss']
})
export class FormFieldValidationMessagesComponent implements OnInit {

  @Input()
  wariFormControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
