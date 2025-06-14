import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { changePassUrl, requestHeaders } from "../../../Services/api";

interface ChangePasswordState {
  loading: boolean;
  errors: string | null;
  success: boolean;
  data: {}
 
}

const initialState: ChangePasswordState = {
  loading: false,
  errors: null,
  success: false,
  data: {}

};


const changePasswordApi = createAsyncThunk(
  "changePassword/changePasswordApi",
  async (passwordData: { password: string, password_new: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${changePassUrl}`, {
        password: passwordData.password,
        password_new: passwordData.password_new,
      },
      {
        headers: requestHeaders,
      }
      );

      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });

      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while changing password.",
        {
          autoClose: 2000,
          theme: "colored",
        }
      );
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordd: (state, action) => {
      //   state.password= action.payload;
      //   state.password_new = action.payload;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordApi.fulfilled, (state, action) => {
        // state.password= action.payload;
        // state.password_new = action.payload;
        state.loading = false;
        state.success = true;
        state.data = action.payload;


      })
      .addCase(changePasswordApi.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || "Failed to change password.";
      });
  },
});

export const { changePasswordd } = changePasswordSlice.actions;
export { changePasswordApi };
export default changePasswordSlice.reducer;
