import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetPassUrl } from "../../../Services/api";
import axios from "axios";
import { toast } from "react-toastify";
import { requestHeaders } from '../../../Services/api'
interface ResetState {
    email: string,
    otp: number,
    password: string,
    isSend: boolean,
    errors: string | null;
}
const initialState: ResetState = {
    email: "",
    otp: null,
    password: "",
    isSend: false,
    errors: null
    // role: null,
    // loading: false,
};

const resetPass = createAsyncThunk(
    "resetPassword/resetPass", async (ResetData) => {
        try {
            const response = await axios.post(`${resetPassUrl}`, ResetData
                , {
                    headers: {
                        Authorization: `${requestHeaders}`
                    }
                }
            )
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

const ResetSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        resetPassword: (state, actions) => {
            state.isSend = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetPass.pending, (state, actions) => {
            state.isSend = false;
        });
        builder.addCase(resetPass.fulfilled, (state, actions) => {
            state.isSend = true // login successful
            state.email = actions.payload
            state.password = actions.payload
            state.otp = actions.payload
        });
        builder.addCase(resetPass.rejected, (state, actions) => {
            state.isSend = false,
                state.errors = actions.payload
        });
    },
})

// export const selectUser = (state) => state.login.role;
export const { resetPassword } = ResetSlice.actions;
export { resetPass }
export default ResetSlice.reducer  