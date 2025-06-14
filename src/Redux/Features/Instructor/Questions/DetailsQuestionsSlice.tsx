import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { QuestionUrl, requestHeaders } from "../../../../Services/api";

interface DetailsProps {
  details: {},  // Make sure details is initialized to an object
  loading: boolean;
  error: null | string;
}



const initialState: DetailsProps = {
  details: {},  // Make sure details is initialized to an object
  loading: false,
  error: null,
};

export const DetailsQuestionsSlice = createSlice({
  name: "DetailsQuestionsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestionDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getQuestionDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.details = action.payload;
      }
    );
    builder.addCase(getQuestionDetails.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const getQuestionDetails = createAsyncThunk<any, string>(
  "DetailsQuestionsSlice/getQuestionDetails",
  async (questionId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`${QuestionUrl}/${questionId}`, {
        headers: requestHeaders,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export default DetailsQuestionsSlice.reducer;
