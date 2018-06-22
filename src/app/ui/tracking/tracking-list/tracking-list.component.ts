import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../core/data/message.service';
import { PaginationConfig, TableConfig, PaginationEvent } from 'patternfly-ng';

@Component({
  selector: 'wari-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.scss']
})
export class TrackingListComponent implements OnInit {

  rows: Comment[] = [];
  allRows: Comment[] = [];

  columns: any[] = [
    { name: 'ID', prop: 'id', sortable: true },
    { name: 'Post ID', prop: 'postId', sortable: true },
    { name: 'Name', prop: 'name', sortable: false },
    { name: 'E-Mail', prop: 'email', sortable: false },
    { name: 'Body', prop: 'body', sortable: false }
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

  constructor(private message: MessageService) {
  }

  ngOnInit() {

  }

  handlePage($event: PaginationEvent): void {
    this.updateRows();
  }

  updateRows(): void {
    this.rows = this.allRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }

  load(): void {
    this.message.success("Successfully loaded  comments from service");
  }

  clear(showMsg: boolean = true): void {
    this.allRows = [];
    this.updateRows();

    if (showMsg) {
      this.message.info('Cleared data');
    }
  }

  ngAfterViewInit() {
  }

}