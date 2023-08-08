import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  token: localStorage.getItem("user_token")
    ? localStorage.getItem("user_token")
    : "",
  _id: "",
  name: "",
  email: "",
  loading: false,
  registerStatus: "",
  registerError: null,
  loginStatus: "",
  loginError: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/register`,
        userDetails
      );
      localStorage.setItem("user_token", data.token);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/login`, user);

      localStorage.setItem("user_token", data.token);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("user_token");
      return {
        ...state,
        _id: "",
        name: "",
        email: "",
        loading: false,
        registerStatus: "",
        loginStatus: "",
        token: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          registerStatus: "pending",
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload) {
          const user = jwtDecode(action.payload.token);
          return {
            ...state,
            token: action.payload.token,
            _id: user._id,
            name: user.name,
            email: user.email,
            loading: false,
            registerStatus: "fullfilled",
          };
        } else {
          return state;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        return {
          ...state,
          registerStatus: "rejected",
          registerError: action.payload,
        };
      })
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          const user = jwtDecode(action.payload.token);
          return {
            ...state,
            token: action.payload.token,
            _id: user._id,
            name: user.name,
            email: user.email,
            loading: false,
            loginStatus: "fullfilled",
          };
        } else {
          return state;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          loginStatus: "rejected",
          loginError: action.payload,
        };
      });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
