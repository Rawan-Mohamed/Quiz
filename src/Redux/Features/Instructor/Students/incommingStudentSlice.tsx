// incommingStudentSlicea

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { incommingStudent,requestHeaders } from "../../../../Services/api";
import axios from "axios";


export interface Props {
  data: [];
  loading: boolean;
  error: null | string;
}

export const fetchIncommingStudent = createAsyncThunk<any, void>(
  "incomStudentsData/fetchIncommingStudent",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await axios.get(`${incommingStudent}`, {
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

export const incommingStudentSlice = createSlice({
  name: "incomStudentsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIncommingStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        fetchIncommingStudent.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = true;
        console.log(state.data);

      }
    );
    builder.addCase(fetchIncommingStudent.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default incommingStudentSlice.reducer;