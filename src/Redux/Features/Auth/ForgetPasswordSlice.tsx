import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgetPassUrl } from "../../../Services/api";
import axios from "axios";
import { toast } from "react-toastify";

interface ForgetState {
    email: string ,
    isSend: boolean,
    errors: string | null;
}
const initialState: ForgetState = {
    email: "",
    isSend: false,
    errors: null
    // role: null,
    // loading: false,
    // errors: null,
};

const forgetPass = createAsyncThunk(
    "forgetPassword/forgetPass", async (UserEmail) => {
        try {
            const response = await axios.post(`${forgetPassUrl}`, UserEmail)
            console.log("response", response);

            toast.success(response.data.message, {
                autoClose: 2000,
                theme: "colored",
            });
            return response?.data?.message;
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "An error occurred during sending email.",
                {
                    autoClose: 2000,
                    theme: "colored",
                }
            );

            throw error; // Make sure to re-throw the error to keep the rejection behavior
        }

    });

const ForgetSlice = createSlice({
    name: 'forgetPassword',
    initialState,
    reducers: {
        forgetPassword: (state, actions) => {
            state.email = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(forgetPass.pending, (state,actions) => {
            state.isSend = false;
        });
        builder.addCase(forgetPass.fulfilled, (state, action) => {
            state.isSend = true // send email successfully
            state.email = action.payload;
        });
        builder.addCase(forgetPass.rejected, (state, action) => {
            state.isSend = false
        });
    },
})

// export const selectUser = (state) => state.login.role;
export const { forgetPassword } = ForgetSlice.actions;
export { forgetPass }
export default ForgetSlice.reducer  