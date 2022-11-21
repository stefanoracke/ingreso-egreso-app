import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './core/store/app.reducer';
import { OrdenarIEPipe } from './core/pipes/ordenar-ie.pipe';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthModule } from './views/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ComponentsDashboardModule } from './views/components/components-dashboard.module';


 

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,


    AuthModule,

    AppRoutingModule,
    ReactiveFormsModule,
    FirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
