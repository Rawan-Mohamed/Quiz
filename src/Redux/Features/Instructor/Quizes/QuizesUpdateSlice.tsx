
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateQuizessUrl, requestHeaders } from "../../../../Services/api";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const updateQuizesTitle= createAsyncThunk(
  "UpdateQuizess/updateQuizesTitle",
  async ({ quizesId, newTitle }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!quizesId) {
        throw new Error("quizesId is undefined");
      }

      const response = await axios.put(
        `${UpdateQuizessUrl}/${quizesId}`,
        { title: newTitle },
        {
          headers: requestHeaders,
        }
      );
      toast.success(response?.data?.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return response?.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during Update",
        {
          autoClose: 2000,
          theme: "colored",
        }
      );

      throw error;
    }
  }
);


const UpdateQuizess = createSlice({
  name: "UpdateQuizess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateQuizesTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateQuizesTitle.fulfilled, (state, action) => {
      state.loading = false;
      console.log('Received data:', action.payload);
      // Update state with the received data
      state.data = action.payload;

    });
    builder.addCase(updateQuizesTitle.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.error.message;
      console.error('updateQuizesTitle rejected:', action.error); // Log the error details


    });
  },
});

export default UpdateQuizess.reducer;
