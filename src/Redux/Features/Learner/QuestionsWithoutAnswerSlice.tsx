import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { questionsWithoutAnswers, requestHeaders } from "../../../Services/api";

// Define the initial state
const initialState = {
  questions: [],
  loading: false,
  error: null,
};

// Async thunk to fetch quiz questions without answers data from the API
export const fetchQuestionsWithoutAnswers = createAsyncThunk(
  "questionsWithoutAnswers/fetchQuestions",
  async (quizId) => {
    const response = await axios.get(`${questionsWithoutAnswers}/${quizId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
    console.log(response);
    
    return response.data.data;
  }
);

// Define the questionsWithoutAnswers slice
const questionsWithoutAnswersSlice = createSlice({
  name: "questionsWithoutAnswers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsWithoutAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionsWithoutAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        state.error = null;
      })
      .addCase(fetchQuestionsWithoutAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default questionsWithoutAnswersSlice.reducer;
