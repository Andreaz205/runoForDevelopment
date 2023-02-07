import {createAction} from "@reduxjs/toolkit";

export const addItemToCart = createAction('cart/add-to-cart')
export const increment = createAction('cart/increment')
export const decrement = createAction('cart/decrement')
export const deleteItem = createAction('cart/delete-item')
export const clearCart = createAction('cart/clear')
