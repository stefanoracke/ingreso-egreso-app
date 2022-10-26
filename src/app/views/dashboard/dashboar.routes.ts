import { Routes } from "@angular/router";
import { DetailsComponent } from "../components/details/details.component";
import { StatsComponent } from "../components/stats/stats.component";
import { IngresoEgresoComponent } from "../ingreso-egreso/ingreso-egreso.component";

export const dashboardRoutes:Routes = [
    {path: '',component:StatsComponent},
    {path:'ingreso-egreso', component:IngresoEgresoComponent},
    {path:'details',component:DetailsComponent}
]