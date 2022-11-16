import { createAction, props } from '@ngrx/store';
import { IngresoEgresoI } from '../../models/ingreso-egreso.interface';

export const setItems = createAction('[Ingreso-Egreso] Set Items',
    props<{items: IngresoEgresoI[]}>()
    );
export const unsetItems = createAction(
    '[Ingreso-Egreso] Unset Items'
);
