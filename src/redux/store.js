import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./root-saga";

import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

// logging the state after the action happened but before the root reducer
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
// in case of multiple middlewares, we spread the array elements into the function's arguments
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// run the sagas here
sagaMiddleware.run(rootSaga);

// persist the cart in session
export const persistor = persistStore(store);

export default { store, persistStore };
