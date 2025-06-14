import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllQuestionsUrl, requestHeaders } from "../../../../Services/api";
import axios from "axios";


export interface Props {
  data: [];
  loading: boolean;
  error: null | string;
}

export const QuestionsData = createAsyncThunk<any, void>(
  "GetQuestionsSlice/QuestionsData",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await axios.get(`${getAllQuestionsUrl}`, {
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

export const GetQuestionsSlice = createSlice({
  name: "QuestionsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(QuestionsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      QuestionsData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = true;


      }
    );
    builder.addCase(QuestionsData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetQuestionsSlice.reducer;