import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from './ui/ui.reducer';
import * as authReducer from './auth/auth.reducer'
import * as ingresoEgresoReducer from './ingreso-egreso/ingreso-egreso.reducer'


export interface AppState {
   ui: uiReducer.State,
   auth: authReducer.State
   ingresoegreso: ingresoEgresoReducer.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: uiReducer._uiReducer,
   auth: authReducer._authReducer,
   ingresoegreso: ingresoEgresoReducer._ingresoEgresoReducer
}