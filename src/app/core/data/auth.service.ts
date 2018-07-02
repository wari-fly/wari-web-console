import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    private message: MessageService,
  ) { this.user = afAuth.authState; }

  signup(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);

  }
  
  oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.message.success('Welcome to Firestarter!!!');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  login(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome back!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => {
        this.notify.update('Email or password incorrects!', 'error');
        this.handleError(error)
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/wari/login']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.log(error);
    this.message.error(error.message);
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`profile/${user.uid}`);
    const data: User = { uid: user.uid, email: user.email || null };
    return userRef.set(data);
  }
}
