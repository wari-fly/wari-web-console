import { Component, OnInit } from "@angular/core";
import { CardConfig, CardFilter } from "patternfly-ng";
import { MessageService } from "../../core/data/message.service";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "angularfire2/storage";
import { FirebaseService } from "../../core/data/firebase.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "wari-maintenance",
  templateUrl: "./maintenance.component.html",
  styleUrls: ["./maintenance.component.scss"]
})
export class MaintenanceComponent implements OnInit {
  basicConfig: CardConfig = { title: "Basic Card", noPadding: false };

  fileUploads: any[];

  constructor(
    private messageService: MessageService,
    private uploadService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.messageService.success("Successfully loaded card view");
  }

  ngOnInit() {
    // Use snapshotChanges().map() to store the key
    this.uploadService
      .getFiles(6)
      .snapshotChanges()
      .subscribe(result => {
        console.log(result);
        this.fileUploads = result.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
        console.log(this.fileUploads);
      });

    // .map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // })
    // .subscribe(result => {
    //   this.fileUploads = result;
    // });
  }

  create() {
    this.router.navigate(["./create"], { relativeTo: this.route });
  }

  delete(model) {
    this.uploadService.delete(model);
  }
}
