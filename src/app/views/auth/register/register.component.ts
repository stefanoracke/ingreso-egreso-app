import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
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
export class RegisterComponent implements OnInit {

  constructor( public formB:FormBuilder, private auth:AuthService, private router:Router) { }


  newUser!:FormGroup

  ngOnInit(): void {

    this.newUser = this.formB.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
    )
  }

  crearUsuario(){
    if(this.newUser.invalid) return;

    Swal.fire({
      title: 'Waiting for redirect',
      
      didOpen: () => {
        Swal.showLoading()
        
      },
      
    });
    this.auth.registerUser(this.newUser.value).then(
      user =>{
        Swal.close()
        this.router.navigate([''])
      }
    ).catch(err=>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
       
      })
      )
  }

}
