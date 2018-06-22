import { Component, OnInit } from "@angular/core";
import { FileModel } from "../../../core/model/file.model";
import { FirebaseService } from "../../../core/data/firebase.service";

@Component({
  selector: "wari-maintenance-create",
  templateUrl: "./maintenance-create.component.html",
  styleUrls: ["./maintenance-create.component.scss"]
})
export class MaintenanceCreateComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileModel;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: FirebaseService) {}

  ngOnInit() {}

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match("image.*")) {
      this.selectedFiles = event.target.files;
    } else {
      alert("invalid format!");
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileModel(file);
    this.uploadService.save(this.currentFileUpload, this.progress);
  }
}