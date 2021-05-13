import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {
    // firestore.collection("tasks", ref => ref.where('source', 'array-contains', '') })
  }

  get users(): Observable<User[]> {
    return this.firestore.collection<User>("users").valueChanges();
  }

  /*get_source(collection: AngularFirestoreCollection): Observable<> {
    collection.get().subscribe(snapshot => {
      let id = snapshot.docs.map(doc => { 
        const id = doc.id;
        const data = doc.data;
        this.firestore.collection(doc.ref.path)
        doc.
        data[]
        return { id: id, ...data };
      });
    })
    return 0;
  }*/
}