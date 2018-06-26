import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/data/auth.service';
import { MessageService } from '../../../core/data/message.service';
import { User } from './../../../core/model/user.model';
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
  profile: any = "/assets/img/your-logo-here.png";
  user: User;
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
      password: ['', Validators.compose([Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6), Validators.maxLength(25)])],
    });
  }

  onFileChange($event) {
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$");
    let correctfile = regex.test($event.fileName);
    if (!correctfile) {
      this.message.warning('Warning! The file extension is not as required.');
      return;
    }
    this.file = $event.data;
    this.profile=$event.data;
  }

  save(form) {
    this.auth.signup(this.form.value['email'], this.form.value['password'])
      .then(value => {
        const user: User = Object.assign(this.user || {}, form.value);
        user.uid = value.user.uid;
        this.service.create(user).then(data => {
          this.message.success('Success! Your changes have been saved!.');
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      })
      .catch(err => {
        this.message.error(err.message);
      });
  }
}
