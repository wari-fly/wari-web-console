import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from "firebase";
import { SitioModel } from "../model/sitio.model";
import { MessageService } from "./message.service";
import { v4 as uuid } from 'uuid';
import { User } from './../model/user.model';

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private basePath = "/wari";
  private userPath = "/profile";

  constructor(private message: MessageService, private db: AngularFireDatabase) { }

  async upload(model: SitioModel, progress: { percentage: number }) {
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
            model.key = uuid();
            model.files = documentos;
            model.documentos = null;
            model.imagen = url;
            this.db.object(`${this.basePath}/` + uuid()).set(model);
          }
        });
    });
    // return new Promise((resolve, reject) => {      setTimeout(() => {        resolve(x);      }, 500);    });
    //return this.get(model.key);
  }

  async create(user: User) {
    if (!user.photo) {
      return await this.db.object(this.userPath+'/' + user.uid).set(user);
    }
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.userPath}/${user.photo.name}`).put(user.photo);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        // progress.percentage = Math.round((snap.bytesTransferred / (snap.totalBytes)) * 100);
      },
      error => {
        this.message.error("Error al cargar algunos archivos");
      },
      async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        user.photo = null;
        user.imageUrl = url;
        return await this.db.object(this.userPath+'/' + user.uid).set(user);
      });
  }

  getById(uid: any) {
    this.db.list(this.userPath+'/' + uid, ref => ref.orderByChild("uid").equalTo(uid));
  }

  getAllToLimit(numberItems): AngularFireList<any> {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  }

  getAll(): AngularFireList<any> {
    return this.db.list(this.basePath);
  }
  getAllUsers(): AngularFireList<any> {
    return this.db.list(this.userPath);
  }

  getByKey(key: string): AngularFireList<any> {
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
