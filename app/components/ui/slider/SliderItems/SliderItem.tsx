import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from '../Slider.module.scss'
import divan from '/public/images/divan.jpg'
import Image from "next/image";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import dynamic from "next/dynamic";

const DynamicFavoriteButton = dynamic(import('@/components/ui/favorite-button/FavoriteButton'), {ssr: false})

const SliderItem: FC = ({item, height}) => {
    const {favorites} = useTypedSelector(state => state.favorite)
    const [isFavorite, setIsFavorite] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useMemo(() => {
        if (favorites && favorites.length) {
            let flag = false
            favorites?.map(favoriteElement => {
                if (item.id === favoriteElement.id) {
                    setIsFavorite(true)
                    return flag = true
                }
            })
            !flag && setIsFavorite(false)
        } else {
            setIsFavorite(false)
        }
    }, [favorites, item])

    useEffect(() => {
        if (ref.current && height) ref.current.style.height = height
    }, [ref.current])

    const {addItemToFavorite, deleteItemFromFavorite} = useActions()
    return (
        <div className={styles.sliderItem} id={item.id} ref={ref}>
            <DynamicFavoriteButton deleteItemFromFavorite={deleteItemFromFavorite} addItemToFavorite={addItemToFavorite}
                                   isFavorite={isFavorite} item={item}/>

            <div className={styles.slideWrapper}>
                <div className={styles.sliderImageWrapper}>
                    <Image src={ item.imagePath} alt='' width='400' height='300'/>
                </div>
                {height ?
                   null
                : (
                    <>
                        <div>
                            {item?.title}
                        </div>
                        <div>
                            От {item?.price} P
                        </div>
                    </>
                )}

                {/*<div>*/}
                {/*    sale*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default SliderItem;