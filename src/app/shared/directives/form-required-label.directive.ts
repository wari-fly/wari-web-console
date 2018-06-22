import { Directive, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[wariFormRequiredLabel]'
})
export class FormRequiredLabelDirective implements OnInit {

  @Input()
  wariFormRequiredLabel: FormControl;

  @HostBinding('class.required-pf')
  isRequired: boolean;

  constructor() { }

  ngOnInit() {
    const validator: any = this.wariFormRequiredLabel.validator && this.wariFormRequiredLabel.validator(new FormControl());
    this.isRequired = validator && validator.required;
  }

}
