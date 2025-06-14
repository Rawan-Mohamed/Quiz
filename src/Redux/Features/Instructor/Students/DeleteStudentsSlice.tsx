import { deleteStudentUrl, requestHeaders } from "../../../../Services/api";
import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const deleteStudent = createAsyncThunk(
  "delete/deleteStudent",
  async ({id}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.delete(`${deleteStudentUrl}/${id}`,{
            headers: requestHeaders,       
    
        }
        
      );
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
    });
      return response;
    } catch (error) {
      toast.error(
        
        error.response?.data?.message || "An error occurred during login.",
        {
            autoClose: 2000,
            theme: "colored",
        }
    );
      return rejectWithValue(error?.message);
    }
  }
);

const initialState: Props = { data: [], loading: false, error: null };
const deleteItemSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteStudent.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default deleteItemSlice.reducer;