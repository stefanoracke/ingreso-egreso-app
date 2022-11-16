import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { IngresoEgresoI } from 'src/app/core/models/ingreso-egreso.interface';
import { IngresoEgresoService } from 'src/app/core/services/ingreso-egreso.service';
import { AppState } from 'src/app/core/store/app.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
  ]
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState> ) { }
  cargando=true
  list$!:any
  listSubscribe!:Subscription

  ngOnInit(): void {
    this.listSubscribe = this.store.select('ingresoegreso')
    .pipe
    (filter(value=>value.items.length!=0))
    .subscribe(res=>{
      
      this.list$ = res
      console.log(this.list$)
      this.cargando=false
    })
    
  }

  ngOnDestroy(): void {
    this.listSubscribe.unsubscribe()
  }
}
