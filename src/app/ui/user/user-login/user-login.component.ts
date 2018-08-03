import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../../core/data/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'wari-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  form: FormGroup;
  working = false;

  formErrors: FormErrors = { 'email': '', 'password': '' };
  validationMessages = {
    'email': { 'required': 'Email is required.', 'email': 'Email must be a valid email' },
    'password': { 'required': 'Password is required.', 'pattern': 'Password must be include at one letter and one number.', 'minlength': 'Password must be at least 4 characters long.', 'maxlength': 'Password cannot be more than 40 characters long.' },
  };

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body.parentElement, 'login-pf');
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6), Validators.maxLength(25)])]
    });
    this.form.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
  }

  login(form) {
    this.working = true;
    const formValue = this.form.value;
    this.auth.login(formValue.email, formValue.password)
      .subscribe(
        () => {
          this.router.navigate(['/wari']);
          this.working = false;
        });
  }
}
