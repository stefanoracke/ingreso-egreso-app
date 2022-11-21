import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/app.reducer';
import * as uiActions from 'src/app/core/store/ui/ui.actions';



import Swal  from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public formB:FormBuilder, private auth:AuthService, private router:Router, private store:Store<AppState>) { }
  
  loading:boolean = false
  userAuth!:FormGroup
  uiSubscription!: Subscription

  ngOnInit(): void {
    this.userAuth = this.formB.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.uiSubscription = this.store.select('ui').subscribe(ui=>{
      this.loading = ui.isLoading;
      
    })
  }

  signIn(){
   this.store.dispatch(uiActions.isLoading())

    this.auth.signIn(this.userAuth.value).then(res=>{
      
      this.store.dispatch(uiActions.stopLoading())
      this.router.navigate([''])
    }).catch(err=>{
      this.store.dispatch(uiActions.stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
       
      })
      }
      )
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }


}
