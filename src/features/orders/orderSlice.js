import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

// Асинхронный экшен для получения заказов пользователя
export const fetchOrdersItemByUser = createAsyncThunk(
  "orders/fetchOrdersItemByUser",
  async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/${userId}`, 
        { withCredentials: true }); // Включение куков в запросе
      
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

// Асинхронный экшен для получения данных заказа
export const fetchOrderDatasByOrder = createAsyncThunk(
  "orders/fetchOrderDatasByOrder",
  async (orderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/data/${orderId}`,
        { withCredentials: true }); // Включение куков в запросе

      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

// Создание слайса
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderItems: [],  // Заказы
    status: "idle",  // Статус запроса
    error: null,     // Ошибка, если есть
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOrdersItemByUser
      .addCase(fetchOrdersItemByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersItemByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderItems = action.payload; // Перезаписываем заказы
      })
      .addCase(fetchOrdersItemByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetchOrderDatasByOrder
      .addCase(fetchOrderDatasByOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderDatasByOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderItems = state.orderItems.map(order =>
          order.id === action.meta.arg ? { ...order, data: action.payload } : order
        ); // Добавляем данные к конкретному заказу
      })
      .addCase(fetchOrderDatasByOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Селектор для получения заказов
export const selectOrderItems = (state) => state.order.orderItems;
export default orderSlice.reducer;