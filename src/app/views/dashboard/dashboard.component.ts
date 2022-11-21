import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoI } from 'src/app/core/models/ingreso-egreso.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { IngresoEgresoService } from 'src/app/core/services/ingreso-egreso.service';
import { AppState } from 'src/app/core/store/app.reducer';
import * as IEactions from 'src/app/core/store/ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor( private store : Store<AppState>, private ingresoEgresoSvc:IngresoEgresoService) { }

  userSubscription!:Subscription
  ingresoegresoSubscription!:Subscription

  ngOnInit(): void {
    this.userSubscription= this.store.select('auth')
    .pipe(
      filter(auth=>auth?.user != undefined)
    )
    .subscribe(
      (res)=>{
       
        if(res.user?.uid)
        this.ingresoegresoSubscription=  this.ingresoEgresoSvc.initIngresoEgresoListener(res.user?.uid)
          .subscribe(listIngresoEgreso=>{
            this.store.dispatch(IEactions.setItems({items: listIngresoEgreso as IngresoEgresoI[]}))
          })
          
      }
    )
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
    this.ingresoegresoSubscription?.unsubscribe()
  }

}
