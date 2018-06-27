import { Component, OnInit } from '@angular/core';
import { NavigationItemConfig } from 'patternfly-ng';

@Component({
  selector: 'wari-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit {


  navigationItems: NavigationItemConfig[] = [
    { title: 'Dashboard', iconStyleClass: 'fa fa-dashboard', url: '/wari/home' },
    { title: 'Maintenance', iconStyleClass: 'fa fa-asl-interpreting', url: '/wari/maintenance' },
    { title: 'User', iconStyleClass: 'fa fa-address-book-o', url: '/wari/user' },
    { title: 'Tracking', iconStyleClass: 'fa fa-location-arrow', url: '/wari/tracking' }
  ];

  constructor() {
  }

  ngOnInit() {

  }
}
