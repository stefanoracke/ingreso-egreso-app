import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthfireGuard } from './core/guards/authfire.guard';

import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {
    path:'',
    canLoad: [AuthfireGuard],
    loadChildren: ()=> import('./views/components/components-dashboard.module')
    .then(m => m.ComponentsDashboardModule)
  },
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
