import { Injectable } from '@angular/core';
import { Firestore, getFirestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore: Firestore;

  constructor() {
    this.firestore = getFirestore();
  }

  getCollectionData(collectionName: string): Observable<any> {
    const colRef = collection(this.firestore, collectionName);
    return from(getDocs(colRef).then(snapshot => snapshot.docs.map(doc => doc.data())));
  }

  searchByField(field: string, value: string): Observable<any> {
    const colRef = collection(this.firestore, 'your-collection-name');
    const q = query(colRef, where(field, '==', value));
    return from(getDocs(q).then(snapshot => snapshot.docs.map(doc => doc.data())));
  }
}