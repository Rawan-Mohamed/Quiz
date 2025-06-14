
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { updateQuestionUrl, requestHeaders } from "../../../../Services/api";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


const initialState: Props = {
  data: [],
  loading: false,
  // updating: false,
  error: null,
};
// Define the async thunk for updating a question's answer
// export const updateQuestionAnswer = createAsyncThunk(
//   "UpdateQuestion/updateQuestionAnswer",
//   async ({ questionId, newAnswer }) => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//       const response = await axios.put(
//         `${updateQuestionUrl}/${questionId}`,
//         { answer: newAnswer },
//         {
//           headers: requestHeaders,
//         }


//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const updateQuestionAnswer = createAsyncThunk(
  "UpdateQuestion/updateQuestionAnswer",
  async ({ questionId, newAnswer }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!questionId) {
        throw new Error("questionId is undefined");
      }

      const response = await axios.put(
        `${updateQuestionUrl}/${questionId}`,
        { answer: newAnswer },
        {
          headers: requestHeaders,
        }
      );
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return response.data;
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


const updateQuestion = createSlice({
  name: "UpdateQuestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateQuestionAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateQuestionAnswer.fulfilled, (state, action) => {
      state.loading = false;
      console.log('Received data:', action.payload);
      // Update state with the received data
      state.data = action.payload;

    });
    builder.addCase(updateQuestionAnswer.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.error.message;
      console.error('Update question answer rejected:', action.error); // Log the error details


    });
  },
});

export default updateQuestion.reducer;
