import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import usersReducer from "./userSlice";
import orderItemsReducer from "./ordersSlice";
import cartReducer from "./cartSlice";

// The store now has the ability to accept thunk functions in `dispatch`
const store = configureStore({
  reducer: {
    user: usersReducer,
    orderItems: orderItemsReducer,
    cart: cartReducer,
  },
});
export default store;

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
