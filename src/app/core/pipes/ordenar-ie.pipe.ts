import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoI } from '../models/ingreso-egreso.interface';

@Pipe({
  name: 'ordenarIE'
})
export class OrdenarIEPipe implements PipeTransform {

  transform(items: any, ): IngresoEgresoI[] {
    const arrayForSort = [...<IngresoEgresoI[]>items]
    
    return arrayForSort.sort((a,b)=>{
      if(a.type==='ingreso'){
        return -1;
      }else{
        return 1;
      }
    });
  }

}
