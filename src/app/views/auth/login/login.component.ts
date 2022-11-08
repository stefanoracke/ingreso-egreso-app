import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

import Swal  from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public formB:FormBuilder, private auth:AuthService, private router:Router) { }


  userAuth!:FormGroup

  ngOnInit(): void {
    this.userAuth = this.formB.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signIn(){
   
Swal.fire({
  title: 'Waiting for redirect',
  
  didOpen: () => {
    Swal.showLoading()
    
  },
  
});
    this.auth.signIn(this.userAuth.value).then(res=>{
      console.log(res)
      Swal.close();
      this.router.navigate([''])
    }).catch(err=>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
       
      })
      )
  }




}
