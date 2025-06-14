import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  quizzesUrl, requestHeaders } from "../../../../Services/api";
import axios from "axios";


export interface Props {
  data: [];
  loading: boolean;
  error: null | string;
}

export const fetchQuizzesData = createAsyncThunk<any, void>(
  "QuizzesData/fetchQuizzesData",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await axios.get(`${quizzesUrl}`, {
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
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = true;
        // console.log(state.data);

      }
    );
    builder.addCase(fetchQuizzesData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default getQuizzesSlice.reducer;