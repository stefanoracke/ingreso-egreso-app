import { NgModule } from "@angular/core";
import { Route, Router, RouterModule, Routes } from "@angular/router";
import { dashboardRoutes } from "./dashboar.routes";
import { DashboardComponent } from "./dashboard.component";

const childRoutes: Routes = [
    {
        path:'', component:DashboardComponent, 
        children:dashboardRoutes, 
        // canActivate:[AuthfireGuard]
    },
]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forChild( childRoutes )
    ],
    exports:[
        RouterModule
    ]
})

export class DashboardRoutesModule { }