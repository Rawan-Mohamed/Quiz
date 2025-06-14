import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutUrl, requestHeaders} from "../../../Services/api";
import axios from "axios";
// import { toast } from "react-toastify";

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
      const response = await axios.get(`${logoutUrl}`,{
        headers: requestHeaders,
      });
    console.log(response)
        return response.data;

  });
  const logoutSlice = createSlice({
    name: "auth",
    initialState: {
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(logoutUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
      });
      builder.addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
    },
  });

  export default logoutSlice.reducer;
