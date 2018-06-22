import { Component, OnInit } from '@angular/core';
import { EmptyStateConfig } from 'patternfly-ng';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wari-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {

  emptyStateConfig: EmptyStateConfig = {
    iconStyleClass: 'fa fa-arrow-circle-left',
    title: 'Proyecto UNSCH-Fly Wari',
    info: 'Haga clic en uno de los enlaces de la izquierda para comenzar.'
  };

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
  }


}
