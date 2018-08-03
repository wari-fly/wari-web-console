import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/data/auth.service';
import { MessageService } from '../../../core/data/message.service';
import { FirebaseService } from '../../../core/data/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'wari-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  file: File;
  working = false;
  emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private message: MessageService,
    private service: FirebaseService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      lastName: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      displayName: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25), this.isEqualPassword.bind(this)])],
    });
  }

  isEqualPassword(control: FormControl): { [s: string]: boolean } {
    if (!this.form) {
      return { passwordsNotMatch: true };
    }
    if (control.value !== this.form.controls['password'].value) {
      return { passwordsNotMatch: true };
    }
  }

  onFileChange($event) {
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$");
    let correctfile = regex.test($event.fileName);
    if (!correctfile) {
      this.message.warning('Warning! The file extension is not as required.');
      return;
    }
    this.file = $event.data;
  }

  save(form) {
    const val = this.form.value;
    this.auth.signUp(val.email, val.password).then(
      (data) => {
        const user = Object.assign({}, form.value);
        user.uid = uuid();
        this.service.create(user).then((data) => {
          this.message.success('Success! Your changes have been saved!.');
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      }).catch((err) => {
        console.log('error: ' + err);
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
