import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
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
