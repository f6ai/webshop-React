// root reducer represents the overall reducer based on all of the reducers that comes in
// we need to combine the reducers
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// config: use localStorage as default storage, redux-persist/lib/storage : this is the localstorage
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  key: "root",
  storage,
  // the only reducer we want to persist is cart
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
