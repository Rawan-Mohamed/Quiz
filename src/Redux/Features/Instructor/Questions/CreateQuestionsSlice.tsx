// CreateQuestionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllQuestionsUrl, requestHeaders } from "../../../../Services/api";
import { toast } from "react-toastify";

export const createQuestion = createAsyncThunk(
  "CreateQuestionSlice/createQuestion",
  async (newQuestionData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(getAllQuestionsUrl, newQuestionData, {
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

const createQuestionSlice = createSlice({
  name: "CreateQuestionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createQuestion.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createQuestion.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.creating = false;
      state.error = action.error.message;
    });
  },
});

export default createQuestionSlice.reducer;
