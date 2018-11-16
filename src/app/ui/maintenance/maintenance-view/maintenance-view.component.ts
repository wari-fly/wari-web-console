import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../core/data/message.service';
import { FirebaseService } from '../../../core/data/firebase.service';
import { ListConfig, PaginationConfig, TableConfig, PaginationEvent } from 'patternfly-ng';

@Component({
  selector: 'wari-maintenance-view',
  templateUrl: './maintenance-view.component.html',
  styleUrls: ['./maintenance-view.component.scss']
})
export class MaintenanceViewComponent implements OnInit {
  id: any;
  site: any;
  files: any[];
  rows: any[] = [];
  allRows: any[] = [];

  columns: any[] = [
    { name: 'Latitud', prop: 'latitud', sortable: true },
    { name: 'Logitud', prop: 'logitud', sortable: true }  
  ];

  paginationConfig: PaginationConfig = {
    pageSize: 5,
    pageNumber: 1,
    pageSizeIncrements: [5, 50, 500]
  };

  tableConfig: TableConfig = {
    showCheckbox: false,
    paginationConfig: this.paginationConfig
  };
  
  constructor(private messageService: MessageService,
    private dataservice: FirebaseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['key'];
    this.loadData();
  }

  loadData() {
    this.dataservice
      .getByKey(this.id)
      .snapshotChanges()
      .subscribe(result => {
        this.site = result.map(c => ({ key: c.payload.key, ...c.payload.val() }))[0];
        this.files = this.site.files;
        this.allRows=this.site.coordenadas;
        this.updateRows();
      }, error => {
        this.messageService.error("Error cargando datos del servidor.");
      });
  }
  
  handlePage($event: PaginationEvent): void {
    this.updateRows();
  }

  updateRows(): void {
    this.rows = this.allRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }
}
