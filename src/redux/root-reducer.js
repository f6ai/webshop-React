// root reducer represents the overall reducer based on all of the reducers that comes in
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// config: use localStorage as default storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    // the only reducer we want to persist is cart
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer, 
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);