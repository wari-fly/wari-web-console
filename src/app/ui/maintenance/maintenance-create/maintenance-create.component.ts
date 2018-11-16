import { Component, OnInit } from "@angular/core";
import { SitioModel } from "../../../core/model/sitio.model";
import { FirebaseService } from "../../../core/data/firebase.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { MessageService } from "../../../core/data/message.service";

@Component({
  selector: "wari-maintenance-create",
  templateUrl: "./maintenance-create.component.html",
  styleUrls: ["./maintenance-create.component.scss"]
})
export class MaintenanceCreateComponent implements OnInit {
  files: FileList;
  data: any[];
  documentos: Array<File> = new Array<File>();
  form: FormGroup;
  progress: { percentage: number } = { percentage: 0 };
  working = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private dataservice: FirebaseService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      ubicacion: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      periodo: [null, Validators.compose([Validators.maxLength(200)])],
      altitud: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      antecedente: [null, Validators.compose([Validators.maxLength(200)])],
      estado: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      descripcion: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
      coordenadas: this.formBuilder.array([])
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      latitud: [null, Validators.compose([Validators.required])],
      logitud: [null, Validators.compose([Validators.required])]
    });
    this.coordenadas.push(formGroup);
    return formGroup;
  }

  removeDetalleFormControl(index) {
    this.coordenadas.removeAt(index);
  }

  onFileChange($event) {
    if ($event.files.length > 0) {
      this.files = $event.files;
      this.data = $event.data;
    } else {
      this.message.warning('¡Advertencia! La extensión del archivo no es la requerida.');
    }
  }

  get coordenadas(): FormArray {
    return this.form.get('coordenadas') as FormArray;
  }

  save(form) {
    if (!form.value.coordenadas || form.value.coordenadas.length === 0) {
      this.message.warning('¡Advertencia! Se requiere agregar al menos una línea en coordenadas gps.');
      return;
    }
    if (!this.files) {
      this.message.warning('¡Advertencia! Se requiere agregar una imagen al sitio arqueológico.');
      return;
    }
    const files = this.files;
    for (let index = 0; index < files.length; index++) {
      this.documentos.push(files.item(index));
    }
    const model: SitioModel = form.value;
    model.documentos = this.documentos;

    this.dataservice.upload(model, this.progress).then(() => {
      this.files = null;
      this.data = [];
      this.message.success('Correcto! El sitio arqueológico ha sido creado.');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}