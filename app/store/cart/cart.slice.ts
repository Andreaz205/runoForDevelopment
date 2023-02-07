import {ICartInitialState} from "@/store/cart/cart.interface";
import {getFromLocalStorage} from "@/utils/getFromLocalStorage";
import {createSlice} from "@reduxjs/toolkit";
import {addItemToCart, clearCart, decrement, deleteItem, increment} from "@/store/cart/cart.actions";

let sum = 0
let init = 0
let cart = getFromLocalStorage('cart')
cart?.map(el => {
    init += el.count
    el.price ? sum += el.price * el.count : null
})

const initialState: ICartInitialState = {
    isLoading: false,
    cart: getFromLocalStorage('cart'),
    amount: init,
    sum: sum
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart, (state, {payload}) => {

                let candidate = state.cart?.find(el => el.id == payload.id)
                if (state.cart?.length) {
                    if (candidate) {
                        state.cart?.map(el => el.id == payload.id && el.count++)
                    } else {
                        payload.count = 1
                        state.cart.push(payload)
                    }
                } else {
                    payload.count = 1
                    state.cart = [payload]
                }
                payload.price ? state.sum += payload.price : null
                state.amount++
        })
            .addCase(increment, (state, {payload}) => {
                let flag = false
                state.cart.map(el => {
                    if (el.id == payload.id && el.count < 100) {
                        el.count++
                        flag = true
                    }
                })
                payload.price && flag ? state.sum += payload.price : null
                let storageCartString = localStorage.getItem('cart')
                let storageCart = JSON.parse(storageCartString!)
                storageCart.map(el => el.id == payload.id && el.count < 100 && el.count++)
                localStorage.setItem('cart', JSON.stringify(storageCart))
                flag && state.amount++
            })
            .addCase(decrement, (state, {payload}) => {
                let flag = false
                state.cart.map(el => {
                    if (el.id == payload.id && el.count > 1) {
                        el.count--
                        flag = true
                    }
                })
                payload.price && flag ? state.sum -= payload.price : null
                let storageCartString = localStorage.getItem('cart')
                let storageCart = JSON.parse(storageCartString!)
                storageCart.map(el => el.id == payload.id && el.count > 1 && el.count--)
                localStorage.setItem('cart', JSON.stringify(storageCart))
                flag && state.amount--
            })
            .addCase(deleteItem, (state, {payload}) => {
                state.sum -= payload.count * (payload.price ? payload.price : 0)
                state.cart = state.cart.filter(el => el.id != payload.id)
                let storageCartString = localStorage.getItem('cart')
                let storageCart = JSON.parse(storageCartString!)
                storageCart = storageCart.filter(el => el.id != payload.id)
                localStorage.setItem('cart', JSON.stringify(storageCart))
                state.amount = state.amount - payload.count
            })
            .addCase(clearCart, (state) => {
                state.cart = []
                localStorage.removeItem('cart')
            })

    }


})

export const {reducer} = cartSlice