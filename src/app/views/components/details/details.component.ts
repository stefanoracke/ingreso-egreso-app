import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { IngresoEgresoI } from 'src/app/core/models/ingreso-egreso.interface';

import { IngresoEgresoService } from 'src/app/core/services/ingreso-egreso.service';
import { AppState } from 'src/app/core/store/app.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
  ]
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private IEService:IngresoEgresoService ) { }
  cargando=true
  list$!:any
  listSubscribe!:Subscription

  ngOnInit(): void {
    this.listSubscribe = this.store.select('ingresoegreso')
    .pipe
    (filter(value=>value.items.length!=0))
    .subscribe(res=>{
      
      this.list$ = res
      

      
    
    
      
      this.cargando=false
    })
    
  }

  ngOnDestroy(): void {
    this.listSubscribe.unsubscribe()
  }

  delete(uid:any){
    

    let item = this.list$.items.filter((res:IngresoEgresoI) => res.uid == uid)
    

    this.IEService.deleteItem(uid).then(res=>{
      console.log(res)
      Swal.fire('Eliminado correctamente', `El item ${item[0].description} se ha borrado correctamente`, 'success')
    }).catch(err=>{
      Swal.fire('Ocurrio un eror intente nuevamente', err.message, 'error')
    })
   
  }
}
