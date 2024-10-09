import { createSlice } from "@reduxjs/toolkit";

import { createAppAsyncThunk } from "./withTypes";
import { api } from "../services/axios";
import { RootState } from ".";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantityInStock: number;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  total: number;
  orderItems: OrderItem[];
}

export interface OrderRequest {
  userId: number;
  total: number;
  orderItems: { productId: number; quantity: number }[];
}

// type OrderItemUpdate = Pick<OrderItem, "id" | "title" | "content">;
// type NewOrderItem = Pick<OrderItem, "title" | "content" | "user">;

interface OrderItemsState {
  orderItems: OrderItem[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

export const fetchOrderItems = createAppAsyncThunk(
  "orderItems/fetchOrderItems",
  async () => {
    const response = await api.get<OrderItem[]>("/orders/with-products");
    return response.data;
  },
  {
    condition(_, thunkApi) {
      const orderItemsStatus = selectOrderItemsStatus(thunkApi.getState());
      if (orderItemsStatus !== "idle") {
        return false;
      }
    },
  }
);

export const addNewOrder = createAppAsyncThunk(
  "orderItems/addNewOrder",
  async (orderItemRequest: OrderRequest) => {
    const { orderItems, userId, total } = orderItemRequest;

    const response = await api.post<Order>(`/orders/${userId}`, {
      orderItems,
      total,
    });
    return response.data.orderItems;
  }
);

const initialState: OrderItemsState = {
  orderItems: [],
  status: "idle",
  error: null,
};

const orderitemsSlice = createSlice({
  name: "orderItems",
  initialState,
  reducers: {
    // orderItemUpdated(state, action: PayloadAction<OrderItemUpdate>) {
    //   const { id, title, content } = action.payload;
    //   const existingOrderItem = state.orderItems.find(
    //     (orderItem) => orderItem.id === id
    //   );
    //   if (existingOrderItem) {
    //     existingOrderItem.title = title;
    //     existingOrderItem.content = content;
    //   }
    // },
    // reactionAdded(
    //   state,
    //   action: PayloadAction<{ orderItemId: number; reaction: ReactionName }>
    // ) {
    //   const { orderItemId, reaction } = action.payload;
    //   const existingOrderItem = state.orderItems.find(
    //     (orderItem) => orderItem.id === orderItemId
    //   );
    //   if (existingOrderItem) {
    //     existingOrderItem.reactions[reaction]++;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Save the fetched orderitems into state
        state.orderItems = action.payload;
      })
      .addCase(fetchOrderItems.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.orderItems.push(...action.payload);
      });
  },
});

// export const { orderItemUpdated, reactionAdded } = orderitemsSlice.actions;

export default orderitemsSlice.reducer;

export const selectAllOrderItems = (state: RootState) =>
  state.orderItems.orderItems;

// export const selectOrderItemById = (state: RootState, orderItemId: number) =>
//   state.orderItems.orderItems.find((orderItem) => orderItem.id === orderItemId);

export const selectOrderItemsStatus = (state: RootState) =>
  state.orderItems.status;
export const selectOrderItemsError = (state: RootState) =>
  state.orderItems.error;
