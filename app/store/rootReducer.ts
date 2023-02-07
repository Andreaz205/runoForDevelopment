import {reducer as userReducer} from '@/store/user/user.slice'
import {reducer as favoriteReducer} from '@/store/favorite/favorite.slice'
import {reducer as cartReducer} from '@/store/cart/cart.slice'
import {reducer as sessionReducer} from '@/store/session/session.slice'
import {reducer as toastrReducer} from 'react-redux-toastr'

export const reducers = {
    user: userReducer,
    cart: cartReducer,
    toastr: toastrReducer,
    favorite: favoriteReducer,
    session: sessionReducer
}