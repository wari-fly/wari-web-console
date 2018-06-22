import { Component, OnInit } from "@angular/core";
import { CardConfig, CardAction } from "patternfly-ng";

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "angularfire2/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "../../../core/data/message.service";
import { FirebaseService } from "../../../core/data/firebase.service";

@Component({
  selector: 'wari-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {

  basicConfig: CardConfig = { title: "Proyecto wari", noPadding: true, action: { id: "create", hypertext: 'Add New Location', iconStyleClass: 'fa fa-plus-circle' } };
  files: any[];

  constructor(
    private messageService: MessageService,
    private uploadService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.uploadService
      .getFiles()
      .snapshotChanges()
      .subscribe(result => {
        this.files = result.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.messageService.success("Successfully loaded card view");
      });
  }

  create() {
    this.router.navigate(["./create"], { relativeTo: this.route });
  }

  delete(model) {
    this.uploadService.delete(model);
  }

  handleActionSelect(event: CardAction): void {
    this.router.navigate(["./" + event.id], { relativeTo: this.route });
  }
}