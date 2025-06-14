import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getResultsUrl, requestHeaders } from "../../../../Services/api";

// Async thunk to fetch students data from the API
export const getResults = createAsyncThunk(
  "results/getResults",
  async () => {
    const response = await axios.get(`${getResultsUrl}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
    return response.data;
  }
);

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Define the students slice
const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getResults.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default resultsSlice.reducer;