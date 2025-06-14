import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUrl } from "../../../Services/api";
import axios from "axios";
import { toast } from "react-toastify";

interface LoginState {
    role: string | null;
    data: [];
    loading: boolean;
    errors: string | null;
    islogged: null;
    success: boolean; // Add this line if not already present


}
const storedUserRole = localStorage.getItem("userRole");

const initialState: LoginState = {
    role: storedUserRole,
    data: [],
    loading: false,
    errors: null,
    islogged: null,
    success: true // Add this line if not already present

};

const loginUser = createAsyncThunk(
    "login/loginUser", async (UserData) => {
        try {

            const response = await axios.post(`${loginUrl}`, UserData)
            localStorage.setItem("userRole", response?.data?.data?.profile.role);
            localStorage.setItem("authToken", response?.data?.data?.accessToken);
            localStorage.setItem("userId", response?.data?.data?.profile?._id);

            toast.success(response.data.message, {
                autoClose: 2000,
                theme: "colored",
            });
            return response?.data?.data?.profile?.role;
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "An error occurred during login.",
                {
                    autoClose: 2000,
                    theme: "colored",
                }
            );

            throw error; // Make sure to re-throw the error to keep the rejection behavior
        }

    });


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginDataIslogged: (state) => {
            state.islogged = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.role = action.payload;
            state.loading = false;
            state.islogged = action.payload
            state.success = true // login successful
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
    },
})

// export const selectUser = (state) => state.login.role;
export const { loginDataIslogged } = loginSlice.actions;
export { loginUser }
export default loginSlice.reducer