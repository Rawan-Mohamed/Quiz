import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  quizzesUrl, requestHeaders } from "../../../../Services/api";
import axios from "axios";


export interface Quiz {
  _id: string;
  title: string;
  description?: string;
  group?: string;
  questions_number?: number;
  difficulty?: string;
  type?: string;
  schadule?: string;
  duration?: number;
  score_per_question?: number;
  tags?: string[];
}

export interface Props {
  data: Quiz[];
  loading: boolean;
  error: null | string;
}

export const fetchQuizzesData = createAsyncThunk<Quiz[], void>(
  "QuizzesData/fetchQuizzesData",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await axios.get(`${quizzesUrl}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`},


      });
      return data.data as Quiz[];


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

export const getQuizzesSlice = createSlice({
  name: "QuizzesData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuizzesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchQuizzesData.fulfilled,
      (state, action: PayloadAction<Quiz[]>) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = true;
        // console.log(state.data);

      }
    );
    builder.addCase(fetchQuizzesData.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.error as any)?.message || 'Failed to fetch quizzes';
    });
  },
});

export default getQuizzesSlice.reducer;