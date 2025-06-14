import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllStudentsUrl, requestHeaders } from "../../../../Services/api";

// Define the interface for a single student
interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group?: {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    students: string[];
    max_students: number;
    updatedAt: string;
    createdAt: string;
    __v: number;
  };
}

// Define the interface for the Redux state
export interface StudentsState {
  data: Student[];
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch students data from the API
export const fetchStudents = createAsyncThunk<Student[]>(
  "students/fetchStudents",
  async () => {
    const response = await axios.get<Student[]>(`${getAllStudentsUrl}`,{
      headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`},
    });
    return response.data;
  }
);

// Define the initial state
const initialState: StudentsState = {
  data: [],
  loading: false,
  error: null,
};

// Define the students slice
const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default studentsSlice.reducer;
