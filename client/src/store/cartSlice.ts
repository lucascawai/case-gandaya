import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import { Product } from "./ordersSlice";

export interface CartItem {
  product: Product;
  quantity: number;
}

// type NewCart = Pick<Cart, "title" | "content" | "user">;

interface CartState {
  total: number;
  cartItems: CartItem[];
}

// export const fetchCart = createAppAsyncThunk(
//   "cart/fetchCart",
//   async () => {
//     const response = await api.get<Cart[]>("/orders/with-products");
//     return response.data;
//   },
//   {
//     condition(_, thunkApi) {
//       const cartStatus = selectCarttatus(thunkApi.getState());
//       if (cartStatus !== "idle") {
//         return false;
//       }
//     },
//   }
// );

// export const addNewCart = createAppAsyncThunk(
//   "cart/addNewCart",
//   async (initialCart: NewCart) => {
//     const response = await api.post<Cart>(
//       "/fakeApi/cart",
//       initialCart
//     );
//     return response.data;
//   }
// );

const initialState: CartState = {
  total: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartUpdated(state, action: PayloadAction<CartItem>) {
      const { product, quantity } = action.payload;

      const existingCart = state.cartItems.find(
        (cartItem) => cartItem.product.id === product.id
      );
      if (existingCart) {
        existingCart.quantity += quantity;
        if (existingCart.quantity == 0) {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem != existingCart
          );
        }
        state.total += product.price * quantity;
      } else {
        state.cartItems.push({ product, quantity });
        state.total += product.price;
      }
    },
    clearCart(state) {
      state.total = 0;
      state.cartItems = [];
    },

    // reactionAdded(
    //   state,
    //   action: PayloadAction<{ cartId: number; reaction: ReactionName }>
    // ) {
    //   const { cartId, reaction } = action.payload;
    //   const existingCart = state.cart.find(
    //     (cart) => cart.id === cartId
    //   );
    //   if (existingCart) {
    //     existingCart.reactions[reaction]++;
    //   }
    // },
    //   },
    //   extraReducers: (builder) => {
    //     builder
    //       .addCase(fetchCart.pending, (state) => {
    //         state.status = "pending";
    //       })
    //       .addCase(fetchCart.fulfilled, (state, action) => {
    //         state.status = "succeeded";
    //         // Save the fetched cart into state
    //         state.cart = action.payload;
    //       })
    //       .addCase(fetchCart.rejected, (state, action) => {
    //         state.status = "rejected";
    //         state.error = action.error.message ?? "Unknown Error";
    //       });
    //   .addCase(addNewCart.fulfilled, (state, action) => {
    //     state.cart.push(action.payload);
    //   });
  },
});

export const { cartUpdated, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectAllCart = (state: RootState) => state.cart;
export const selectCartItemById = (state: RootState, productId: number) => {
  const existingCartItem = state.cart.cartItems.find(
    (cartItem) => cartItem.product.id == productId
  );

  if (existingCartItem) {
    return existingCartItem;
  } else {
    return null;
  }
};

// export const selectCartById = (state: RootState, cartId: number) =>
//   state.cart.cart.find((cart) => cart.id === cartId);

// export const selectCarttatus = (state: RootState) => state.cart.status;
// export const selectCartError = (state: RootState) => state.cart.error;
