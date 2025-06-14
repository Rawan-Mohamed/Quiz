
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
import { joinQuizUrl, requestHeaders } from "../../../Services/api";

export const joinQuiz = createAsyncThunk(
  "joinQuizSlice/joinQuiz",
  async (code) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(joinQuizUrl, code,{
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      console.log(response);
      
      return response.data.data;
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
  responseData: null, // Add this property if you need to store the response data

};

const joinMyQuizSlice = createSlice({
  name: "joinQuizSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(joinQuiz.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(joinQuiz.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(joinQuiz.rejected, (state, action) => {
      state.creating = false;
      state.error = action.error.message;
    });
  },
});

export default joinMyQuizSlice.reducer;
