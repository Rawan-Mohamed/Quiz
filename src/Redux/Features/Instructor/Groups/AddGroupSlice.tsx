// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { allGroupUrl, requestHeaders } from "../../../../Services/api"; // Make sure to replace 'addGroupUrl' with the actual URL for adding a group
// import axios from "axios";

// export interface AddGroupState {
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AddGroupState = {
//   loading: false,
//   error: null,
// };

// export const addGroup = createAsyncThunk(
//   "AddGroupSlice/addGroup",
//   async (groupData: { name: string; students?: string[] }) => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//       await axios.post(allGroupUrl, groupData, {
//         headers: requestHeaders,
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const AddGroupSlice = createSlice({
//   name: "AddGroupSlice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(addGroup.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(addGroup.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(addGroup.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message || "An error occurred";
//     });
//   },
// });

// export default AddGroupSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allGroupUrl, requestHeaders } from "../../../../Services/api";
import axios from "axios";
import { toast } from "react-toastify";

export interface AddGroupState {
  loading: boolean;
  error: string | null;
}

const initialState: AddGroupState = {
  loading: false,
  error: null,
};

export const addGroup = createAsyncThunk(
  "AddGroupSlice/addGroup",
  async (groupData: { name: string; students?: string[] }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(allGroupUrl, groupData, {
        headers: requestHeaders,
      });
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message,
        {
          autoClose: 2000,
          theme: "colored",
        }
      );
      throw error;
    }
  }
);

export const AddGroupSlice = createSlice({
  name: "AddGroupSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addGroup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addGroup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default AddGroupSlice.reducer;
