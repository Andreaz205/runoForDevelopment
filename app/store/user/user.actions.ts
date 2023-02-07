import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {IEmailPassword} from "@/store/user/user.interface";
import {AuthService} from "@/services/AuthService";
import {UserService} from "@/services/UserService";

export const register = createAsyncThunk<{},IEmailPassword>('auth/register', async ({email, password, name}, thunkAPI) => {
    try {
        await AuthService.issueCSRF()
        await AuthService.register(email ,password, name!)
        let {data} = await UserService.getAuthUser()
        return data
    } catch (e) {
        alert(e)
        return thunkAPI.rejectWithValue(e)
    }
})

export const login = createAsyncThunk<{},IEmailPassword>('auth/login', async ({email, password}, thunkAPI) => {
    try {
        await AuthService.issueCSRF()
        await AuthService.login(email, password)
        const user = await UserService.getAuthUser()
        localStorage.setItem('user', JSON.stringify(user.data))
        return user.data
    } catch (e) {
        alert(e)
        return thunkAPI.rejectWithValue(e)
    }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await AuthService.logout()
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const checkAuth = createAsyncThunk('auth/check-auth', async (_, thunkAPI) => {
    try {
        const response = await UserService.getAuthUser()
        return response.data
    } catch (e: any) {
        if (e.message === 'Unauthorized') thunkAPI.dispatch(logout())
        thunkAPI.rejectWithValue(e)
    }
})

export const openLoginPopup = createAction('open-login-popup')
export const closeLoginPopup = createAction('close-login-popup')

export const openRegisterPopup = createAction('open-register-popup')
export const closeRegisterPopup = createAction('close-register-popup')

