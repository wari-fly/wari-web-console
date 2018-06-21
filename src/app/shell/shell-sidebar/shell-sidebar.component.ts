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
    { title: 'Maintenance', iconStyleClass: 'fa fa-camera', url: '/wari/maintenance' },
    { title: 'Tracking', iconStyleClass: 'fa fa-location-arrow', url: '/wari/tracking' }
  ];

  constructor() {
  }

  ngOnInit() {

  }
}
