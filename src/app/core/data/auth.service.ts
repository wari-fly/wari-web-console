import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { NotifyService } from './notify.service';
import { AuthInfo } from '../guard/auth-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    private message: MessageService,
  ) { }

  // signup(email: string, password: string): Promise<firebase.auth.UserCredential> {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password);

  // }

  signUp(email, password) {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  login(email, password): Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }
  // login(email: string, password: string) {
  //   return this.afAuth.auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(credential => {
  //       this.notify.update('Welcome back!', 'success');
  //       return this.updateUserData(credential.user);
  //     })
  //     .catch(error => {
  //       this.notify.update('Email or password incorrects!', 'error');
  //       this.handleError(error)
  //     });
  // }

  signOut() {
    this.afAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/wari/login']);
    // this.afAuth.auth.signOut().then(() => {
    //   this.router.navigate(['/wari/login']);
    // });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    this.message.error(error.message);
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`profile/${user.uid}`);
    const data: User = { uid: user.uid, email: user.email || null };
    return userRef.set(data);
  }

  /*
    *
    * This is a demo on how we can 'Observify' any asynchronous interaction
    *
    *
    * */

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();
    promise
      .then(res => {
        const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
        err => {
          this.authInfo$.error(err);
          subject.error(err);
          subject.complete();
        });

    return subject.asObservable();
  }
}
