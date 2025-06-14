import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  incommingQuiz,requestHeaders } from "../../../../Services/api";
import axios from "axios";


export interface Props {
  data: [];
  loading: boolean;
  error: null | string;
}

export const fetchIncommingQuizzes = createAsyncThunk<any, void>(
  "incomQuizzesData/fetchIncommingQuizzes",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await axios.get(`${incommingQuiz}`, {
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

export const incommingQuizSlice = createSlice({
  name: "incomQuizzesData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIncommingQuizzes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        fetchIncommingQuizzes.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = true;
        console.log(state.data);

      }
    );
    builder.addCase(fetchIncommingQuizzes.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default incommingQuizSlice.reducer;