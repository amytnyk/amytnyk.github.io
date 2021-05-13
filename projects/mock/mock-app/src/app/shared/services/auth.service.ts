import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: firebase.User;
  authState$: Observable<boolean>;

  constructor(
    public auth: AngularFireAuth
  ) {
    this.authState$ = new Observable(subscriber => {
      this.auth.authState.subscribe(user => {
        console.log(user);
        if (user) {
          console.log("Signed in");
          this.user = user;
          subscriber.next(true);
        } else {
          console.log("Signed out");
          this.user = null;
          subscriber.next(false);
        }
      })
    });
  }

  get authStateObserver(): Observable<boolean> {
    return new Observable(subscriber => {
      if (this.user !== undefined)
        subscriber.next();
      this.authState$.subscribe(logged_in => {
        subscriber.next(logged_in);
      });
    });
  }

  get isLoggedIn(): Promise<boolean> {
    console.log(this.user);
    return new Promise((resolve, _) => {
      this.auth.authState.subscribe((user) => {
        console.log(user);
        resolve(user != null);
      })
    });
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider: firebase.auth.GoogleAuthProvider) {
    return this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
        this.setUserData(result.user);
      }).catch((error) => {
        console.log(error);
      })
    })
    .then(_ => { console.log("Success!"); })
    .catch(err => {console.log(err.message)});
  }

  setUserData(user: firebase.User) {
    this.user = user;
  }

  signOut() {
    return this.auth.signOut().then(() => {
      console.log("Singed out");
      // Do nothing now
    })
  }
}