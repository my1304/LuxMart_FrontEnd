import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import showAlert from "../../components/MessageForms/AlertService";

// Определение асинхронных операций

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {  
    try {
      const response = await axios.post(`${BASE_URL}/cart`, {
        userId,
        productId,
        quantity,
      }, { withCredentials: true, // Включение куков в запросе
      });
      return response.data;
    } catch (error) {
      showAlert("Error - " + error.message)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart`,{ withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchdeleteItemFromCart = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (cartId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${cartId}`,{ withCredentials: true });
      return cartId; // Возвращаем id удаленного элемента
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPaymentItem = createAsyncThunk(
  'cart/paymentItem',
  async (cartId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");

      const response = await axios.get(`${BASE_URL}/cart/payment/${cartId}`,{ 
        withCredentials: true,
      });

      return response.data; // Возвращаем id удаленного элемента
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchupdateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartId, updateCartItem }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/${cartId}`, // Используем cartId в URL
        updateCartItem, // Передаем только данные для обновления
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartItemsByUser = createAsyncThunk(
  "cart/fetchCartItemsByUserId",
  async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

export const fetchOrderItemByUser = createAsyncThunk(
  "cart/order/fetchOrderItemByUser",
  async ({userId, addData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/order/${userId}`, // Используем cartId в URL
        addData, // Передаем только данные для обновления
        { withCredentials: true }); 
      return response.data;
    } catch (error) {
      // Проверяем, есть ли response в error
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message); // Выбрасываем общее сообщение об ошибке
      }
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/cart/clear`, { withCredentials: true });
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = [...state.cartItems, action.payload];
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchdeleteItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchdeleteItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(fetchdeleteItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchupdateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchupdateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      })
      .addCase(fetchupdateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCartItemsByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
