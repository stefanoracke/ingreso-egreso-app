import { Injectable } from '@angular/core';
import { UserFormI } from 'src/app/views/auth/register/register.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserI } from '../models/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as authReducer from '../store/auth/auth.action';
import { unsetItems } from '../store/ingreso-egreso/ingreso-egreso.actions';


export interface SignInI{
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user?:UserI

  get user(){
    return {... this._user};
  }

  constructor(public auth:AngularFireAuth, private router:Router, private firestore:AngularFirestore,private store:Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      
      if(fuser){
        this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe(firestoreUser=>{
          
          
          this.store.dispatch(authReducer.setUser(
            {user:(<UserI> firestoreUser)}
          ))
          this._user = (<UserI> firestoreUser)
        })
        
      }else{
        this._user = undefined
        this.store.dispatch(authReducer.unsetUser())
        this.store.dispatch(unsetItems())
      }
      
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
