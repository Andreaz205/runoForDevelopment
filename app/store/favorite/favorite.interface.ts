import {ICartItem} from "@/store/cart/cart.interface";

export interface IFavorite extends ICartItem {}

export interface IFavoriteInitialState {
    isLoading: boolean,
    favorites: IFavorite[],
    amount: number,
    isOpenFavoritePopup: boolean
}