import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import showAlert from "../../components/MessageForms/AlertService";


export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (err) {
      showAlert('Data entry error');
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      return userId; // Возвращаем id удаленного пользователя для последующей обработки в Redux
    } catch (error) {
      console.error("Failed to delete user", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");

      const profile = await axios.get(`${BASE_URL}/auth/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return profile.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      // Запрос на логин
      const loginResponse = await axios.post(`${BASE_URL}/auth/login`, payload, {
        withCredentials: true, // Включение куков в запросе
      });

      // Извлечение токена доступа из ответа
      const accessToken = loginResponse.data.access_token;

      // Сохранение токена в localStorage
      localStorage.setItem("accessToken", accessToken);

      // Запрос на получение профиля
      const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
        withCredentials: true, // Включение куков в запросе
        headers: {
          Authorization: `Bearer ${accessToken}`, // Использование токена в заголовке
        },
      });

      // Возвращение данных профиля
      return profileResponse.data;
    } catch (err) {
      showAlert('Data entry error');
            console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);


export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);



export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");

      await axios(
        `${BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }        
      );

      localStorage.removeItem("accessToken");

      window.location.reload();

      return true;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
    error: null,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });

      state.cart = newCart;
    },
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
    builder.addCase(fetchUserProfile.fulfilled, addCurrentUser);
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentUser = null;
    });
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addItemToCart, removeItemFromCart, toggleForm, toggleFormType } =
  userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;