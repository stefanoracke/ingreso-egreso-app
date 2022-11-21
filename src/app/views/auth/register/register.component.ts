import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/app.reducer';
import * as uiActions from 'src/app/core/store/ui/ui.actions';
import Swal from 'sweetalert2';

export interface UserFormI{
  nombre:string
  email:string
  password: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor( public formB:FormBuilder, private auth:AuthService, private router:Router, private store: Store<AppState>) { }
  disabled = false;
  isLoading:boolean = false;
  newUser!:FormGroup;
  uiSubscription!:Subscription

  ngOnInit(): void {

    this.newUser = this.formB.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
    )

    this.uiSubscription = this.store.select('ui').subscribe(ui=>{
      this.isLoading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe()
  }

  crearUsuario(){
    if(this.newUser.invalid) return;
    this.disabled = true
    // Swal.fire({
    //   title: 'Waiting for redirect',
      
    //   didOpen: () => {
    //     Swal.showLoading()
        
    //   },
      
    // });
    this.store.dispatch(uiActions.isLoading())
    this.auth.registerUser(this.newUser.value).then(
      user =>{
        // Swal.close()
        this.store.dispatch(uiActions.stopLoading())
        this.router.navigate([''])
      }
    ).catch(err=>{
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
       
      })
      this.disabled = false
    }
      
      )
  }

}
