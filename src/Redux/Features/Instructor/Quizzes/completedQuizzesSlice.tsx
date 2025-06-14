import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  completedQuiz,requestHeaders } from "../../../../Services/api";
import axios from "axios";


export interface Props {
  data: [];
  loading: boolean;
  error: null | string;
}

export const fetchcompletedQuizzes = createAsyncThunk<any, void>(
  "completQuizzesData/fetchcompletedQuizzes",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await axios.get(`${completedQuiz}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`},


      });

      return data.data;


    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);


const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const completedQuizzesSlice = createSlice({
  name: "completQuizzesData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchcompletedQuizzes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        fetchcompletedQuizzes.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = true;


      }
    );
    builder.addCase(fetchcompletedQuizzes.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default completedQuizzesSlice.reducer;