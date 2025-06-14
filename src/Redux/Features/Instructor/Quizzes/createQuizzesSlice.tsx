// CreateQuestionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { quizzesUrl, requestHeaders } from "../../../../Services/api";
import { toast } from "react-toastify";

export const fetchCreateQuizz = createAsyncThunk(
  "createQuizzesSlice/createQuizz",
  async (newQuizzData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(quizzesUrl, newQuizzData, {
        headers: requestHeaders,
      });
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during Create",
        {
          autoClose: 2000,
          theme: "colored",
        }
      );

      throw error;
    }
  }
);

const initialState = {
  creating: false,
  error: null,
};

const createQuizzesSlice = createSlice({
  name: "createQuizzesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateQuizz.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(fetchCreateQuizz.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(fetchCreateQuizz.rejected, (state, action) => {
      state.creating = false;
      state.error = action.error.message;
    });
  },
});

export default createQuizzesSlice.reducer;
