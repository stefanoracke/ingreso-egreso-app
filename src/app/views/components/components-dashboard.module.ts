import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { StatsComponent } from './stats/stats.component';
import { DetailsComponent } from './details/details.component';
import { OrdenarIEPipe } from 'src/app/core/pipes/ordenar-ie.pipe';


import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { _ingresoEgresoReducer } from 'src/app/core/store/ingreso-egreso/ingreso-egreso.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    StatsComponent,
    DetailsComponent,
    OrdenarIEPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingresoegreso', _ingresoEgresoReducer)
  ],
  exports:[
    
  ]
})
export class ComponentsDashboardModule { }
 