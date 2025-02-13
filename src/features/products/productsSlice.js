import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

import { BASE_URL } from '../../utils/constants';
import { shuffle } from '../../utils/common';


export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkApi) => {
        try {
            const res = await axios(`${BASE_URL}/products`, { withCredentials: true });
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const postProduct = createAsyncThunk(
    'products/postProduct',
    async (productData, { rejectWithValue }) => {
      try {
        await axios.post(`${BASE_URL}/products`, productData, { withCredentials: true });
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, thunkApi) => {
        try {
            const res = await axios.delete(`${BASE_URL}/products/${id}`, { withCredentials: true });
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (payload, thunkApi) => {
        try {
            const res = await axios.put(`${BASE_URL}/products/${payload.id}`, payload, { withCredentials: true });
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (id, thunkApi) => {
      try {
        const res = await axios(`${BASE_URL}/products/${id}`, { withCredentials: true });
        console.log('getProductById response:', res.data); // Добавьте этот лог
        return res.data;
      } catch(err) {
        console.error('getProductById error:', err); // Добавьте этот лог
        return thunkApi.rejectWithValue(err);
      }
    }
  );

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        productDetails: null,
        filtered: [],
        related: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        updateProductDetails(state, action) {
            const { productId, details } = action.payload;
            state.productDetails[productId] = details;
          },
        clearProducts(state) {
            state.products = [];
          },
          setProducts(state, action) {
            state.products = action.payload;
          },
        filterByPrice: (state, { payload }) => {
            state.filtered = state.list.filter(({ price }) => price < payload);
        },
        getRelatedProducts: (state, { payload }) => {
            const list = state.list.filter(({ categoryId }) => categoryId === payload);
            state.related = shuffle(list);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(postProduct.fulfilled, (state, { payload }) => {
            state.list.push(payload); // добавляем новый продукт в список
            state.isLoading = false;
        });
        builder.addCase(postProduct.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.list = state.list.filter(product => product.id !== payload.id);
            state.isLoading = false;
        });
        builder.addCase(deleteProduct.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            const index = state.list.findIndex(product => product.id === payload.id);
            if (index !== -1) {
                state.list[index] = payload;
            }
            state.isLoading = false;
        });
        builder.addCase(updateProduct.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });
        builder.addCase(getProductById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.productDetails = action.payload;
            state.isLoading = false;
          });
        builder.addCase(getProductById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          });
    },
});

export const { clearProducts, setProducts, filterByPrice, getRelatedProducts, updateProductDetails  } = productsSlice.actions;

export default productsSlice.reducer;