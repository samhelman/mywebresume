import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { switchMap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { User, Info, Education, Portfolio, Experience, UserData } from './user.model';
import { FlashService } from './flash.service';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  user: Observable<User>;
  userData;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
    private flashService: FlashService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async login(email: string, password: string) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    let user = (await this.afAuth.currentUser)
    this.flashService.createFlashMessage(`'${user.email}' has been logged in!`, 'success')
    return this.router.navigate(['/dashboard']);
  }

  async logout() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  register(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      response => {
        return response;
      }
    );
  }

  setUpUserFirestore(user) {
    var userData = {
      info: <User>{
        email: user.email,
        username: user.uid
      }
    }
    this.updateUser(user.uid, userData)
    var resumeData = {
      info: <Info>{
        email: user.email,
        username: user.uid,
      },
      experience: Array<Experience>(),
      education: Array<Education>(),
      portfolio: Array<Portfolio>()
    }
    this.updateUserResume(user.uid, resumeData)
  }

  updateUser(uid: string, data: object) {
    this.afs.collection('users').doc(uid).set(
      data,
      { merge: true }
    )
  }

  updateUserResume(uid: string, data: UserData) {
    this.afs.collection('users').doc(uid).collection('resume-data').doc(uid).set(
      data,
      { merge: true }
    )
  }

  getUserId(username: String) {
    return this.afs.collection('users', ref => ref.where('username', '==', username)).valueChanges();
  }

  getUserData(uid: String) {
    return this.afs.collection('users').doc(`${uid}`).collection('resume-data').valueChanges();
  }

  async getCurrentUser() {
    return (await this.afAuth.currentUser)
  }

  async getCurrentUserInfo() {
    return this.getCurrentUser().then(
      response => {
        return this.afs.collection('users').doc(`${response.uid}`).valueChanges()
      }
    )
  }

  async getCurrentUserData() {
    return this.getCurrentUser().then(
      response => {
        return this.afs.collection('users').doc(`${response.uid}`).collection('resume-data').valueChanges()
      }
    )
  }

  async upload(event) {
    let uid = (await this.afAuth.currentUser).uid
    let ref = this.afStorage.ref(`profilePics/${uid}`);
    return await ref.put(event.target.files[0]).then(
      response => {
        let downloadURL = ref.getDownloadURL();
        return downloadURL
      }
    );
  }

  usernameIsValid(uid: string, username: string) {
    return this.afs.collection('users', ref => ref.where('username', '==', username).where('uid', '!=', uid)).valueChanges()
  }
}
