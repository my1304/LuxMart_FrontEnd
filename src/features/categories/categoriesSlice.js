import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { BASE_URL } from '../../utils/constants';


export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkApi) => {
        try {
            const res = await axios(`${BASE_URL}/categories`);
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (categoryData, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/categories`, categoryData);
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (categoryData, thunkApi) => {
        try {
            const res = await axios.put(`${BASE_URL}/categories/${categoryData.id}`, categoryData);
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, thunkApi) => {
        try {
            const res = await axios.delete(`${BASE_URL}/categories/${id}`);
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

export const getCategoryById = createAsyncThunk(
    'categories/getCategoryById',
    async (id, thunkApi) => {
        try {
            const res = await axios(`${BASE_URL}/categories/${id}`);
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getCategoryById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.categoryDetails = null;
        });
        builder.addCase(getCategoryById.fulfilled, (state, { payload }) => {
            state.categoryDetails = payload;
            state.isLoading = false;
        });
        builder.addCase(getCategoryById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.response?.status === 404 ? 'Category not found' : action.error.message;
        });
        builder.addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteCategory.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Failed to delete category";
        });

    },
});

export default categoriesSlice.reducer;