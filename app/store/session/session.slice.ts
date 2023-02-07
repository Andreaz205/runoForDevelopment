import {createSlice} from "@reduxjs/toolkit";
import {ISessionInitialState} from "@/store/session/session.interface";
import {closeCityPopup, fetchSessionData, openCityPopup, setStateCity} from "@/store/session/session.actions";

const initialState: ISessionInitialState = {
    city: '',
    isLoading: false,
    isOpen: false
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessionData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchSessionData.fulfilled, (state, {payload}) => {
                state.isLoading = false
                if (payload.city) {
                    state.city = payload.city
                } else {
                    state.isOpen = true
                }

            })
            .addCase(fetchSessionData.rejected, (state, error) => {
                state.isLoading = false
                state.isOpen = true
                alert(error)
            })
            .addCase(openCityPopup, (state) => {
                state.isOpen = true
            })
            .addCase(closeCityPopup, (state) => {
                state.isOpen = false
            })
            .addCase(setStateCity, (state, {payload}) => {
                console.log(payload)
                state.city = payload
            })

    }
})

export const {reducer} = sessionSlice