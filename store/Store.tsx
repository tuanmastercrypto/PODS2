// import  {configureStore} from "@reduxjs/toolkit"
// import cartReducer from "./cartSlice"


// const store = configureStore({
//     reducer:{
//         cart: cartReducer
//     }
// })


// export type RootState = ReturnType<typeof store.getState>;
// export type AddDispatch=typeof store.dispatch;
// export default store;
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import cartReducer from "./cartSlice"; // Import reducer của bạn

const persistConfig = {
  key: "cart",    
  storage,        
};


const persistedCartReducer = persistReducer(persistConfig, cartReducer);


const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
