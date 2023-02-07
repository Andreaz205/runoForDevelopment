import {IFavoriteInitialState} from "@/store/favorite/favorite.interface";
import {getFromLocalStorage} from "@/utils/getFromLocalStorage";
import {createSlice} from "@reduxjs/toolkit";
import {
    addItemToFavorite,
    closeFavoritePopup,
    deleteItemFromFavorite,
    openFavoritePopup
} from "@/store/favorite/favorite.actions";

const initialState: IFavoriteInitialState = {
    isLoading: false,
    favorites: getFromLocalStorage('favorite') || [],
    isOpenFavoritePopup: false,
    amount: getFromLocalStorage('favorite')?.length
}

console.log(getFromLocalStorage('favorite'))

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItemToFavorite, (state, {payload}) => {
                let existsItem = state.favorites.find(item => item.id == payload.id)
                if (!existsItem) {
                    let localStorageArrayFavorites = getFromLocalStorage('favorite')
                    if (!localStorageArrayFavorites || localStorageArrayFavorites.length === 0) {
                        let newArrayFavorites = JSON.stringify([payload])
                        localStorage.setItem('favorite', newArrayFavorites)
                    } else {
                        localStorageArrayFavorites.push(payload)
                        localStorage.setItem('favorite', JSON.stringify(localStorageArrayFavorites))
                    }
                    state.favorites.push(payload)
                    state.amount = state.favorites.length
                }
            })
            .addCase(deleteItemFromFavorite, (state, {payload}) => {
                let itemForDelete = state.favorites.find(item => item.id === payload.id)
                if (itemForDelete) {
                    let localStorageArrayFavorites = getFromLocalStorage('favorite')
                    localStorageArrayFavorites = localStorageArrayFavorites.filter(item => item.id !== payload.id)
                    localStorage.setItem('favorite', JSON.stringify(localStorageArrayFavorites))
                    state.favorites = state.favorites.filter(favoriteItem => favoriteItem.id !== payload.id)
                    state.amount = state.favorites.length
                }
            })
            .addCase(openFavoritePopup, (state) => {
               state.isOpenFavoritePopup = true
            })
            .addCase(closeFavoritePopup, (state) => {
                state.isOpenFavoritePopup = false
            })
    }
})

export const {reducer} = favoriteSlice