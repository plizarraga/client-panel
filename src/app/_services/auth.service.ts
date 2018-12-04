import { Injectable, assertPlatform } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => { resolve(user) }, err => { reject(err)})
    });
  }

  logout() {
    this.afAuth.auth.signOut()
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => { resolve(user) }, err => { reject(err)})
    });
  }

  isAuth() {
    return this.afAuth.authState;
  }
}
