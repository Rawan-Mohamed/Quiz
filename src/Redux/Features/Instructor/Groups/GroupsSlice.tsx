
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allGroupUrl, requestHeaders } from "../../../../Services/api";
import axios from "axios";

export interface GroupsState {
  data: Group[];
  loading: boolean;
  error: string | null;
}

export interface Group {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students?: [
    _id: string,
  ];
  max_students: 25;
}




const initialState: GroupsState = {
  data: [],
  loading: false,
  error: null,
};

export const GroupsSlice = createSlice({
  name: "GroupsData",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchGroups.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = true;
        // console.log(state.data);
        state.error = null;

      }
    );
    builder.addCase(fetchGroups.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export const fetchGroups = createAsyncThunk<Group[]>(
  "GroupsSlice/fetchGroups",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await axios.get<Group[]>(`${allGroupUrl}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      // console.log(requestHeaders);
      // console.log(data.data);
      return data.data;


    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

export default GroupsSlice.reducer;