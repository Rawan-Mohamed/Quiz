// import { quizDetailsUrl, requestHeaders } from "../../../../Services/api";
// import axios from "axios";
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// interface DetailsProps {
//   details: {},  // Make sure details is initialized to an object
//   loading: boolean;
//   error: null | string;
// }

// const initialState: DetailsProps = {
//   details: {},  // Make sure details is initialized to an object
//   loading: false,
//   error: null,
// };



// export const quizDetails = createAsyncThunk(
//   "details/quizDetails",
//   async ( id ) => {

//     // eslint-disable-next-line no-useless-catch
//     try {
//       const response = await axios.get(`${quizDetailsUrl}/${id}`, {
//         headers: requestHeaders,
//       }

//       );

//       return response?.data;
//     } catch (error) {
//       throw error
//       //   return rejectWithValue(error?.message);
//     }
//   }
// );
// const detailsItemSlice = createSlice({
//   name: "details",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(quizDetails.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(quizDetails.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.details = action.payload.data;
//       })
//       .addCase(quizDetails.rejected, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export default detailsItemSlice.reducer;



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { quizDetailsUrl, requestHeaders } from "../../../../Services/api";

interface DetailsProps {
  details: {},  // Make sure details is initialized to an object
  loading: boolean;
  error: null | string;
}



const initialState: DetailsProps = {
  details: {},  // Make sure details is initialized to an object
  loading: false,
  error: null,
};


export const QuizesDetaiksSlice = createSlice({
  name: "DetailsQuizSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(quizDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      quizDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.details = action.payload;
        // state.details.data = action.payload
        // state.details.data = action.payload;
      }
    );
    builder.addCase(quizDetails.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const quizDetails = createAsyncThunk<any, string>(
  "DetailsQuizSlice/quizDetails",
  async (quizId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`${quizDetailsUrl}/${quizId}`, {
        headers: requestHeaders,
      });
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export default QuizesDetaiksSlice.reducer;
