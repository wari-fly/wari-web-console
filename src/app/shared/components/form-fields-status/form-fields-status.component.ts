import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'wari-form-fields-status',
  templateUrl: './form-fields-status.component.html',
  styleUrls: ['./form-fields-status.component.scss']
})
export class FormFieldsStatusComponent implements OnInit {

  @Input()
  wariForm: FormGroup;

  hasRequiredFields: boolean;

  constructor() { }

  ngOnInit() {
    this.refreshState();
  }

  refreshState() {
    this.hasRequiredFields = this.checkIfHasRequiredFields(this.wariForm);
  }

  checkIfHasRequiredFields(formGroup: FormGroup): boolean {
    let result = false;
    for (const key in this.wariForm.controls) {
      if (!this.wariForm.controls[key]) { continue; }

      const abstractControl: AbstractControl = this.wariForm.controls[key];
      if (abstractControl instanceof FormGroup) {
        if (this.checkIfHasRequiredFields(abstractControl)) {
          result = true;
          break;
        }
      } else {
        const validator: any = abstractControl.validator && abstractControl.validator(new FormControl());
        if (validator && validator.required) {
          result = true;
          break;
        }
      }
    }
    return result;
  }

}
