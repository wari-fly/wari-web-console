import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
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
    private notify: NotifyService,
    private message: MessageService,
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  ////// OAuth Methods /////

  googleLogin() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return this.oAuthLogin(provider);
  }

  githubLogin() {
    // const provider = new firebase.auth.GithubAuthProvider();
    // return this.oAuthLogin(provider);
  }

  facebookLogin() {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // return this.oAuthLogin(provider);
  }

  twitterLogin() {
    // const provider = new firebase.auth.TwitterAuthProvider();
    // return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.message.success('Welcome to Firestarter!!!');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.message.success('Welcome to Firestarter!!!');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.message.success('Welcome new user!');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
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

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    // const fbAuth = firebase.auth();

    // return fbAuth
    //   .sendPasswordResetEmail(email)
    //   .then(() => this.notify.info('Password update email sent'))
    //   .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/wari/login']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.message.error(error.message);
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'Anónimo',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);
  }
}
