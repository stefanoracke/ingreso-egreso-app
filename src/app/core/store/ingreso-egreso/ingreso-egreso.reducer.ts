import { createReducer, on } from '@ngrx/store';
import { IngresoEgresoI } from '../../models/ingreso-egreso.interface';
import { AppState } from '../app.reducer';
import { setItems, unsetItems } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgresoI[]; 
}
export interface SteteLazyIngreso extends AppState{
    ingresoegreso:State
}

export const initialState: State = {
   items: [],
}

export const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, {items}) => ({ ...state, items})),
    on(unsetItems, (state ) => ({ ...state, items:[]})),

);
