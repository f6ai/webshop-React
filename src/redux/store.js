import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// logging the state after the action happened but before the root reducer
const middlewares = [logger];
// in case of multiple middlewares, we spread the array elements into the function's arguments
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// persist the cart in session
export const persistor = persistStore(store);

export default { store, persistStore };