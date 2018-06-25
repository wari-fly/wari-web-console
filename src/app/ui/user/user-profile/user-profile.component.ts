import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/data/auth.service';

@Component({
  selector: 'wari-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }
}
