import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/app.reducer';
import { unsetItems } from 'src/app/core/store/ingreso-egreso/ingreso-egreso.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  username?:string
  auth_Subscription!:Subscription

  constructor(private auth:AuthService, private router:Router,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.auth_Subscription = this.store.select('auth').subscribe(
      res=>{
        this.username =res.user?.name
      }
    )
  }

  ngOnDestroy(): void {
    this.auth_Subscription?.unsubscribe()
  }

  signOut(){
    
    Swal.fire({
      title: 'Cerrando sesión',
      
      didOpen: () => {
        
        
        Swal.showLoading()
      },
      
    });
    this.auth.signOut().then(res=>{
      setInterval(()=>{
        Swal.close()
      }, 200)

      this.router.navigate(['login'])
    }
    )
  }
}
