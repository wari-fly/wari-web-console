import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from "firebase";
import { SitioModel } from "../model/sitio.model";
import { MessageService } from "./message.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private basePath = "/wari";

  constructor(private message: MessageService, private db: AngularFireDatabase) { }

  async save(model: SitioModel, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const documentos: any[] = [];
    let size = 0;
    model.documentos.forEach(file => {
      const uploadTask = storageRef.child(`${this.basePath}/${file.name}`).put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round((snap.bytesTransferred / (snap.totalBytes)) * 100);
        },
        error => {
          this.message.error("Error al cargar algunos archivos");
        },
        async () => {
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          size++;
          documentos.push(url);
          if (size == model.documentos.length) {
            model.key = Math.random().toString(36).substring(2);
            model.files = documentos;
            model.documentos = null;
            model.imagen = url;
            this.db.list(`${this.basePath}/`).push(model);
          }
        });
    });
    // return new Promise((resolve, reject) => {      setTimeout(() => {        resolve(x);      }, 500);    });
    //return this.get(model.key);
  }

  saveFileData(filemodel: SitioModel) {
    this.db.list(`${this.basePath}/`).push(filemodel);
  }

  getFilesToLimit(numberItems): AngularFireList<any> {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  }

  getFiles(): AngularFireList<any> {
    return this.db.list(this.basePath);
  }

  get(key: string): AngularFireList<any> {
    return this.db.list(this.basePath, ref => ref.orderByChild("key").equalTo(key));
  }

  delete(filemodel: SitioModel) {
    this.deleteFileDatabase(filemodel.key)
      .then(() => {
        this.deleteFileStorage(filemodel.key);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
