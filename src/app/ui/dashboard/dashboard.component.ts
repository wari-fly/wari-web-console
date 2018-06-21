import { Component, OnInit } from '@angular/core';
import { EmptyStateConfig } from 'patternfly-ng';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wari-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
