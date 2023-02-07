import {IInitialState} from "@/store/user/user.interface";
import {getFromLocalStorage} from "@/utils/getFromLocalStorage";
import {createSlice} from "@reduxjs/toolkit";
import {
    closeLoginPopup,
    closeRegisterPopup,
    login,
    logout,
    openLoginPopup,
    openRegisterPopup,
    register
} from "@/store/user/user.actions";

const initialState: IInitialState = {
    isLoading: false,
    isOpenLoginPopup: false,
    isOpenRegisterPopup: false,
    user: getFromLocalStorage('user')
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload
                state.isOpenLoginPopup = false
            })
            .addCase(login.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            .addCase(register.pending, state => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload
                state.isOpenRegisterPopup = false
            })
            .addCase(register.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            .addCase(logout.pending, state => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.user = null
            })
            .addCase(logout.rejected, state => {
                state.isLoading = false
            })
            .addCase(closeLoginPopup, state => {
                state.isOpenLoginPopup = false
            })
            .addCase(openLoginPopup, state => {
                state.isOpenLoginPopup = true
            })
            .addCase(closeRegisterPopup, state => {
                state.isOpenRegisterPopup = false
            })
            .addCase(openRegisterPopup, state => {
                state.isOpenRegisterPopup = true
            })
    }
})


export const {reducer} = userSlice