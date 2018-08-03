import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/data/auth.service';
import { MessageService } from '../../../core/data/message.service';
import { FirebaseService } from '../../../core/data/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wari-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  file: File;
  working = false;

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
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.required, Validators.minLength(6), Validators.maxLength(25)])],
      confirmPassword: ['', Validators.compose([Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.required, Validators.minLength(6), Validators.maxLength(25), this.isEqualPassword.bind(this)])],
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
    this.auth.signUp(val.email, val.password).subscribe(
      (data) => {
        const user = Object.assign({}, form.value);
        user.uid = data.user.uid;
        this.service.create(user).then(() => {
          this.message.success('Success! Your changes have been saved!.');
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      },
      err => this.message.error(err)
    );
  }
  
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
