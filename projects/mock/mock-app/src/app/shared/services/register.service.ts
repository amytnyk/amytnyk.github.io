import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    public firestore: AngularFirestore,
    public auth: AuthService
  ) {
    console.log("Checking");
    auth.authState$.subscribe(logged_in => {
      console.log("Checking");
      if (logged_in) {
        firestore.collection("users", ref => ref.where('uid', '==', auth.user.uid)).get().subscribe(snapshot => {
          if (snapshot.empty) {
            console.log("Creating user");
            const user: User = { 
              uid: auth.user.uid,
              photoURL: auth.user.photoURL,
              displayName: auth.user.displayName,
              email: auth.user.email,
            };
            firestore.collection("users").doc(firestore.createId()).set(user);
          }
        });
      }
    })
  }
}