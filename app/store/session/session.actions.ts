import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {SessionService} from "@/services/SessionService";

export const fetchSessionData = createAsyncThunk<{}>('session/data', async (_, thunkAPI) => {
    try {
        let {data} = await SessionService.getSessionData()
        return data
    } catch (e) {
        alert(e)
        return thunkAPI.rejectWithValue(e)
    }
})

export const openCityPopup = createAction('city-popup/open')
export const closeCityPopup = createAction('city-popup/close')
export const setStateCity = createAction('city/set')