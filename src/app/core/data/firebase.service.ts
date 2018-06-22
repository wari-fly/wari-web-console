import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from "firebase";
import { FileModel } from "../model/file.model";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private basePath = "/wari";

  constructor(private message: MessageService, private db: AngularFireDatabase) { }

  save(model: Array<FileModel>, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const data: any[] = [];
    let size = 0;

    model.forEach(filemodel => {
      const uploadTask = storageRef.child(`${this.basePath}/${filemodel.file.name}`).put(filemodel.file);
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
          data.push({ fileName: filemodel.file.name, url: url });
          if (size == model.length) {
            this.db.list(`${this.basePath}/`).push({ key: new Date().getTime(), url: url, files: data });
          }
        });
    });
  }

  saveFileData(filemodel: FileModel) {
    this.db.list(`${this.basePath}/`).push(filemodel);
  }

  getFilesToLimit(numberItems): AngularFireList<any> {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  }

  getFiles(): AngularFireList<any> {
    return this.db.list(this.basePath);
  }
  delete(filemodel: FileModel) {
    this.deleteFileDatabase(filemodel.key)
      .then(() => {
        this.deleteFileStorage(filemodel.name);
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
