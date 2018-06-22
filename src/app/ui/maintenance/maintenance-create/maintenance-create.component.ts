import { Component, OnInit } from "@angular/core";
import { FileModel } from "../../../core/model/file.model";
import { FirebaseService } from "../../../core/data/firebase.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "../../../core/data/message.service";
import { PreviewService } from "../../../core/data/preview.service";
import { $ } from "protractor";

@Component({
  selector: "wari-maintenance-create",
  templateUrl: "./maintenance-create.component.html",
  styleUrls: ["./maintenance-create.component.scss"]
})
export class MaintenanceCreateComponent implements OnInit {
  files: FileList;
  data = new Array();
  model: Array<FileModel> = new Array<FileModel>();
  form: FormGroup;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private preview: PreviewService,
    private uploadService: FirebaseService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      Description: [null, Validators.compose([Validators.maxLength(200)])]
    });
  }

  onFileChange($event) {
    if ($event.files.length > 0) {
      this.files = $event.files;
      this.data = $event.data;
    } else {
      this.message.warning('Warning! The file extension is not as required.');
    }
  }


  save(form) {
    const files = this.files;
    this.files = undefined;
    for (let index = 0; index < files.length; index++) {
      this.model.push(new FileModel(files.item(index)));
    }
    this.uploadService.save(this.model, this.progress);
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}