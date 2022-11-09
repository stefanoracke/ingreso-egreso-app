import { createReducer, on } from '@ngrx/store';
import { UserI } from '../../models/user.interface';
import { setUser, unsetUser } from './auth.action';

export interface State {
    user: UserI; 
}

export const initialState: State = {
   user: {
    

},
}

export const _authReducer = createReducer(initialState,

    on(setUser, (state, {user}) => ({ ...state, user: user})),
    on(unsetUser, (state, ) => ({ ...state, user: initialState.user})),
);
