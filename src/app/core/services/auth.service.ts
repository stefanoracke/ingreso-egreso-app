import { Injectable } from '@angular/core';
import { UserFormI } from 'src/app/views/auth/register/register.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserI } from '../models/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


export interface SignInI{
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth, private router:Router, private firestore:AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      console.log(fuser)
    })
  }

  registerUser(user:UserFormI){

    return this.auth.createUserWithEmailAndPassword(user.email,user.password).then(
      fbUser => {
        const newUser:UserI={
          name:user.nombre,
          email: user.email,
          uid: fbUser.user?.uid
        }
        return this.firestore.doc(`${fbUser.user?.uid}/usuario`).set(newUser);
      }
    )
  }

  signIn(user:SignInI){
    return this.auth.signInWithEmailAndPassword(user.email,user.password)
  }

  signOut(){
    return this.auth.signOut()
  }

  islogged(){
    return  this.auth.authState.pipe( 
      map(fbUser=>fbUser!=null)
      
    )
  }

}
