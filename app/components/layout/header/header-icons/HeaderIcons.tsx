import React, {FC} from 'react';
import styles from './HeaderIcons.module.scss'
import CartIcon from "@/components/layout/header/header-icons/CartItcon/CartIcon";
import ProfileIcon from "@/components/layout/header/header-icons/ProfileIcon/ProfileIcon";
import FavoriteIcon from "@/components/layout/header/header-icons/FavoriteIcon/FavoriteIcon";


const HeaderIcons :FC = () => {

    return (
        <div className={styles.icons}>
            <CartIcon />
            <ProfileIcon  />
            <FavoriteIcon />
        </div>
    );
};

export default HeaderIcons;