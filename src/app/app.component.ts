import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'; 
import { initializeApp } from 'firebase/app'; 
import { environment } from '../environments/environment';
import { FirestoreService } from './services/firestore.service';// Import FirestoreService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart_Database_manipulation_Tool';
  auth = getAuth();
  data: any;  // Variable to hold Firestore data

  constructor(private firestoreService: FirestoreService) {
    initializeApp(environment.firebaseConfig);
  }

  // Authentication methods
  login() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('User logged in:', result.user);
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  // Firestore fetch method
  fetchData() {
    this.firestoreService.getCollectionData('your-collection-name')
      .subscribe(data => {
        this.data = data;
        console.log('Fetched Data: ', this.data);
      });
  }
}