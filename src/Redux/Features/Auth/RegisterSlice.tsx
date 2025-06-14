import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUrl } from "../../../Services/api";
import axios from "axios";
import { toast } from "react-toastify";

interface RegisterState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}
const initialState: RegisterState = {
  loading: false,
  isRegister: false,
};
const registerUser = createAsyncThunk<void, UserData>("register/registerUser", async (data, thunkAPI) => {
    try {
      const requestBody = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        password: data.password
      };

      const response = await axios.post(`${registerUrl}`, requestBody);

      // Handle response appropriately
      console.log(response.data);
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error(error.response?.data);
      toast.error(
        error.response?.data?.message || "An error occurred during registration.",
        {
          autoClose: 2000,
          theme: "colored",
        }
      );
      throw error;
    }
  });

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.isRegister = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.role = action.payload;
      state.loading = false;
      state.isRegister = true;
      state.success = true; // register successful
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = true;
      state.errors = action.payload;
      state.isRegister = false;
    });
  },
});

export const { fetchDataStart } = registerSlice.actions;
export { registerUser };
export default registerSlice.reducer;
