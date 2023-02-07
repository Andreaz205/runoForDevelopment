import React, {FC} from 'react';
import {FaHeart, FaRegHeart} from "react-icons/fa";
import styles from "@/components/layout/header/header-icons/FavoriteIcon/FavoriteIcon.module.scss";
import Link from "next/link";
import {BsBag} from "react-icons/bs";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const FavoriteIcon :FC = () => {
    const {amount} = useTypedSelector(state => state.favorite)
    const {openFavoritePopup} = useActions()
    if (amount) {
        return (
            <div className={styles.icon} onClick={() => openFavoritePopup()}>
                <div className={styles.number}>{amount}</div>
                <FaHeart />
            </div>

        );
    } else {
        return (
            <div className={styles.icon} onClick={() => openFavoritePopup()}>
                <FaRegHeart />
            </div>
        );
    }
};

export default FavoriteIcon;

