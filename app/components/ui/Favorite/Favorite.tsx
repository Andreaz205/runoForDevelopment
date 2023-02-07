import React, {FC} from 'react';
import styles from './Favorite.module.scss'
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import FavoriteElement from "@/ui/Favorite/FavoriteElement/FavoriteElement";

const Favorite : FC = () => {
    const {favorites} = useTypedSelector(state => state.favorite)

    const {closeFavoritePopup} = useActions()
    return (
        <>
            <div className={styles.header}>Избранное</div>
                <>
                    <div className={styles.clickArea} onClick={() => closeFavoritePopup()}></div>
                    <div className={styles.favorite}>
                        {favorites && favorites.length
                            ? favorites.map(item => (
                                <FavoriteElement item={item} key={item.id}/>
                            ))
                            : (
                                <div>Пусто</div>
                            )
                        }
                    </div>
                </>

        </>
    )
};

export default Favorite;