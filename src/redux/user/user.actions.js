import { UserActionTypes } from './user.types';

// create the actual actions
// ACTION CREATOR functions -> returns objects in correct format
// action type name should never change, we use capitals
export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});