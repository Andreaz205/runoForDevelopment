import React from 'react';
import styles from "@/ui/favorite-button/FavoriteButton.module.scss";
import {BsHeart, BsHeartFill} from "react-icons/bs";

const FavoriteButton = ({isFavorite, deleteItemFromFavorite, addItemToFavorite, item}) => {
    if (isFavorite) {
        return (
        <div className={styles.favoriteButton} onClick={() => deleteItemFromFavorite(item)}>
            <BsHeartFill />
        </div>
        )
    } else {
        return (
            <div className={styles.favoriteButton} onClick={() => addItemToFavorite(item)}>
                <BsHeart/>
            </div>
        )
    }
};

export default FavoriteButton;