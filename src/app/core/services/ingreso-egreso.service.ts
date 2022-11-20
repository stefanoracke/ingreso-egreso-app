import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IngresoEgresoI } from '../models/ingreso-egreso.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore:AngularFirestore, private authS:AuthService) { }

  createIngresoEgreso(value:IngresoEgresoI){
    return this.firestore.doc(`${this.authS.user.uid}/ingresos-egresos`)
      .collection('items')
      .add(value)
      
  }

  initIngresoEgresoListener(uid:string){
    return this.firestore.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
      .pipe(
        map(snapshots=>{
          return snapshots.map(doc=>{
            
            return {uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            }
          })
        })
      )
      
  }
  deleteItem(uidItem:string){
    return this.firestore.doc(`${this.authS.user.uid}/ingresos-egresos/items/${uidItem}`).delete()
  }
}
