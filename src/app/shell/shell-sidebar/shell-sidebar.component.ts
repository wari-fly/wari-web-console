import { Component, OnInit } from '@angular/core';
import { NavigationItemConfig } from 'patternfly-ng';

@Component({
  selector: 'wari-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit {


  navigationItems: NavigationItemConfig[] = [
    { title: 'Informacion Wari', iconStyleClass: 'fa fa-dashboard', url: '/wari/home' },
    { title: 'Registro de Datos', iconStyleClass: 'fa fa-location-arrow', url: '/wari/maintenance' },
    { title: 'Usuarios Wari', iconStyleClass: 'fa fa-address-book-o', url: '/wari/user' }
    // { title: 'Localizaciones', iconStyleClass: 'fa fa-location-arrow', url: '/wari/tracking' }
  ];

  constructor() {
  }

  ngOnInit() {

  }
}
