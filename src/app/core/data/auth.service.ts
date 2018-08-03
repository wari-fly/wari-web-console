import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import { NotifyService } from './notify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`profile/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


  login(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome to Wari Proyect!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome new user!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/wari/login']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`profile/${user.uid}`);
    const data: User = { uid: user.uid, email: user.email || null };
    return userRef.set(data);
  }
}
