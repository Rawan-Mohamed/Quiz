
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { requestHeaders, submitQuizUrl } from "../../../Services/api";

// export const submitQuiz = createAsyncThunk(
//   "SubmitQuizSlice/submitQuiz",
//   async (quizAnswerData,quizId) => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//       const response = await axios.post(`${submitQuizUrl}/${quizId}`, quizAnswerData, {
//         headers: requestHeaders,
//       });
//       toast.success(response.data.message, {
//         autoClose: 2000,
//         theme: "colored",
//       });
//       return response.data;
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "An error occurred during Create",
//         {
//           autoClose: 2000,
//           theme: "colored",
//         }
//       );

//       throw error;
//     }
//   }
// );
export const submitQuiz = createAsyncThunk(
    "SubmitQuizSlice/submitQuiz",
    async (payload) => {
      const { quizId, answers } = payload;
      try {
        const response = await axios.post(`${submitQuizUrl}/${quizId}`, { answers }, {
          headers: requestHeaders,
        });
        toast.success(response.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
        return response.data;
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
};

const submitQuizSlice = createSlice({
  name: "SubmitQuizSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitQuiz.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(submitQuiz.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(submitQuiz.rejected, (state, action) => {
      state.creating = false;
      state.error = action.error.message;
    });
  },
});

export default submitQuizSlice.reducer;
