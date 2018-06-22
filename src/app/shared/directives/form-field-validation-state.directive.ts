import { Directive, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[wariFormFieldValidationState]'
})
export class FormFieldValidationStateDirective implements OnInit {

  @Input()
  wariFormFieldValidationState: FormControl;

  @HostBinding('class.has-error')
  hasError: boolean;

  constructor() { }

  ngOnInit() {
    this.wariFormFieldValidationState.statusChanges.subscribe(controlValue => {
      if (this.wariFormFieldValidationState.valid || this.wariFormFieldValidationState.disabled) {
        this.hasError = false;
      } else {
        this.hasError = true;
      }
    });
  }

}
