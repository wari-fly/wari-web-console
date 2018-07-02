import { Component, OnInit } from '@angular/core';
import { MessageHistory } from '../../core/model/message-history';
import { MessageService } from '../../core/data/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/data/auth.service';

@Component({
  selector: 'wari-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {
  messageHistory: MessageHistory[];
  constructor(
    public message: MessageService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.messageHistory = this.message.getHistory();
  }
  clear() {
    this.message.clear();
  }

  logout() {
    this.auth.signOut();
  }
  profile() {
    this.router.navigate(['/wari/user']);
  }
  security(){
    
  }
}
