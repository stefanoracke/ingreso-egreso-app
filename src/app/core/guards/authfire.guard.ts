import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthfireGuard implements CanActivate {
  
  constructor(private authS:AuthService, private router:Router){}

  canLoad(): Observable<boolean | UrlTree>{

    return this.authS.islogged().pipe(
      tap(estado =>{
        if(!estado) this.router.navigate(['/login'])
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean | UrlTree>{

    return this.authS.islogged().pipe(
      tap(estado =>{
        if(!estado) this.router.navigate(['/login'])
      })
    );
  }
  
}
