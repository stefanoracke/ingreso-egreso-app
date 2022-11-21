import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoI } from 'src/app/core/models/ingreso-egreso.interface';
import { IngresoEgresoService } from 'src/app/core/services/ingreso-egreso.service';
import { AppState } from 'src/app/core/store/app.reducer';
import * as ui from 'src/app/core/store/ui/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  type:string='ingreso'
  ingresoForm!: FormGroup;
  ingresoEgreso!:IngresoEgresoI
  loading:boolean = false
  loadingSubscription!:Subscription

  constructor( private fb:FormBuilder, private ingresoEgresoS:IngresoEgresoService, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      monto: ['', Validators.required],
     
    })
    this.loadingSubscription = this.store.select('ui').subscribe(res=>{
      this.loading = res.isLoading
    })
  }
  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }

  save(){
    this.store.dispatch(ui.isLoading())
   
    this.ingresoEgreso = {
      description:this.ingresoForm.value.description,
      monto: this.ingresoForm.value.monto,
      type: this.type
    }
    this.ingresoEgresoS.createIngresoEgreso(this.ingresoEgreso)
    .then(ref=>{
      Swal.fire('Registro Creado', this.ingresoEgreso.description, 'success')
      this.store.dispatch(ui.stopLoading())
      this.ingresoForm.reset()
    })
    .catch(err=>{
      this.store.dispatch(ui.stopLoading())
      Swal.fire('Ocurrio un error', err.message, 'error')
    })
    
  }

}
