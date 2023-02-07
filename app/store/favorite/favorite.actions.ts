import {createAction} from "@reduxjs/toolkit";

export const addItemToFavorite = createAction('favorite/add-to-favorite')
export const deleteItemFromFavorite = createAction('favorite/delete-item')

export const openFavoritePopup = createAction('favorite/open-popup')
export const closeFavoritePopup = createAction('favorite/close-popup')