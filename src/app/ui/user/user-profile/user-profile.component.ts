import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/data/auth.service';
import { AuthInfo } from '../../../core/guard/auth-info';

@Component({
  selector: 'wari-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(public auth: AuthService) { }

  ngOnInit() {
    //this.auth.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  logout() {
    this.auth.signOut();
  }
}
