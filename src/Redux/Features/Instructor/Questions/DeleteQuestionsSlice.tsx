// DeleteQuestionsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { QuestionUrl, requestHeaders } from "../../../../Services/api";
import { toast } from "react-toastify";

interface DeleteQuestionState {
  data: any[];
  loading: boolean;
  error: null | string;
}

const initialState: DeleteQuestionState = {
  data: [],
  loading: false,
  error: null,
};

// Define the async thunk for deleting a question
export const deleteQuestion = createAsyncThunk(
  "DeleteQuestion/deleteQuestion",
  async (questionId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {

      const response = await axios.delete(`${QuestionUrl}/${questionId}`, {
        headers: requestHeaders,
      });
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return response.data;

    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during Delete",
        {
          autoClose: 2000,
          theme: "colored",
        }
      );
      throw error;
    }
  }
);

const deleteQuestionSlice = createSlice({
  name: "DeleteQuestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.loading = false;
      // Handle success if needed
      state.data = action.payload;

    });
    builder.addCase(deleteQuestion.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.error.message;
      console.error('Delete question rejected:', action.error); // Log the entire response for debugging

    });
  },
});

export default deleteQuestionSlice.reducer;
