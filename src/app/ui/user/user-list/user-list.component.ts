import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../core/data/message.service';
import { PaginationConfig, TableConfig, PaginationEvent } from 'patternfly-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../core/data/firebase.service';
import { User } from './../../../core/model/user.model';

@Component({
  selector: 'wari-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  rows: User[] = [];
  allRows: User[] = [];

  columns: any[] = [
    { name: 'uid', prop: 'uid', sortable: true },
    { name: 'First Name', prop: 'firstName', sortable: true },
    { name: 'Last Name', prop: 'lastName', sortable: false },
    { name: 'E-Mail', prop: 'email', sortable: false },
    { name: 'Display Name', prop: 'displayName', sortable: false }
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

  constructor(
    private message: MessageService,
    private service: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.service.getAllUsers().snapshotChanges()
      .subscribe(result => {
        this.allRows = result.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.updateRows();
        this.message.success("Successfully loaded Wari users");
      }, error => {
        this.message.error("Error loaded Wari users");
      });
  }

  handlePage($event: PaginationEvent): void {
    this.updateRows();
  }

  updateRows(): void {
    this.rows = this.allRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }

  new(): void {
    this.router.navigate(["./create"], { relativeTo: this.route });
  }



}
