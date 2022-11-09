import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from './ui/ui.reducer';
import * as authReducer from './auth/auth.reducer'


export interface AppState {
   ui: uiReducer.State,
   auth: authReducer.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: uiReducer._uiReducer,
   auth: authReducer._authReducer
}