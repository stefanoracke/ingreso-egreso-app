import { createAction,props } from '@ngrx/store';
import { UserI } from '../../models/user.interface';

export const setUser = createAction('[Auth] Set User',
    props<{user:UserI}>()
);
export const unsetUser = createAction('[Auth] Unset User');