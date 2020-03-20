import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<any>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) { 

      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user){
            return this.afs.doc<any>("users/"+user.uid).valueChanges()
          }else{
            return of(null)
          }
        })
      )
    }

    //Login to google
    async googleSignIn(){
      const credential = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      console.log(credential)
      return this.updateUserData(credential.user)
    }

    async signOut(){
      await this.afAuth.auth.signOut()
      return this.router.navigate(["/"])
    }


    updateUserData(user){
      // The reference to your account is taken from firedatabase
      const userRef = this.afs.doc("users/"+user.uid)
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        message: "PERKELE toimii"
      }

      return userRef.set(newUser,{merge: true})

    }




}
