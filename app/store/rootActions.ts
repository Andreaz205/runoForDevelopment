import * as userActions from './user/user.actions'
import * as cartActions from './cart/cart.actions'
import * as favoriteActions from './favorite/favorite.actions'
import * as sessionActions from './session/session.actions'

export const allActions = {
    ...userActions,
    ...cartActions,
    ...favoriteActions,
    ...sessionActions
}