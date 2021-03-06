import { Component, OnInit } from "@angular/core";
import { CardConfig } from "patternfly-ng";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "../../../core/data/message.service";
import { FirebaseService } from "../../../core/data/firebase.service";

@Component({
  selector: 'wari-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {
  config: CardConfig;
  sites: any[];

  constructor(
    private messageService: MessageService,
    private dataservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.config = { noPadding: true, topBorder: false } as CardConfig;
    this.loadData();
  }
  loadData() {
    this.dataservice
      .getAll()
      .snapshotChanges()
      .subscribe(result => {
        this.sites = result.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }, error => {
        this.messageService.error("Error recuperando registros del servidor.");
      });
  }
  create() {
    this.router.navigate(["./create"], { relativeTo: this.route });
  }

  view(site) {
    this.router.navigate(['view/', site.key], { relativeTo: this.route });
  }
  edit(site) {
    this.router.navigate(['edit/', site.key], { relativeTo: this.route });
  }
}