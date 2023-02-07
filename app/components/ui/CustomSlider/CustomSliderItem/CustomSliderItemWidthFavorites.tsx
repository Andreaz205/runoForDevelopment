import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {IItem} from "../CustomSlider";
import styles from './CustomSliderItem.module.scss'
import Image from "next/image";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import dynamic from "next/dynamic";
import {useActions} from "@/hooks/useActions";

export interface ISliderItemProps {
    item: IItem,
    width: number,
    height: number,
    isMobile: boolean,
    mr: number
    mobH: number
    borderRadius: number|undefined
    imagePercents: number|undefined
}

const DynamicFavoriteButton = dynamic(import('@/components/ui/favorite-button/FavoriteButton'), {ssr: false})

const CustomSliderItemWithFavorites:FC<ISliderItemProps & {children: React.ReactNode}> = ({
     item,
     width,
     height,
     isMobile,
     mr,
     mobH,
     children,
    imagePercents,
    borderRadius
 }, ) => {

    const itemRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (itemRef.current && !isMobile) {
            itemRef.current.style.width = width + 'px'
            itemRef.current.style.height = height + 'px'
            itemRef.current.style.marginRight = mr + 'px'
        } else if (isMobile && itemRef.current) {
            itemRef.current.style.width = 100 + '%'
            itemRef.current.style.height = mobH + 'px'
        }
        if (itemRef.current && borderRadius) {
            itemRef.current.style.borderRadius = borderRadius + 'px'
        }
        if (imageRef.current && imagePercents && contentRef.current) {
            imageRef.current.style.height = imagePercents + '%'
            contentRef.current.style.height = 100 - imagePercents + '%'
        }
    }, [imageRef.current, contentRef.current, itemRef.current, isMobile, width, height])

    const {favorites} = useTypedSelector(state => state.favorite)
    const [isFavorite, setIsFavorite] = useState(false)
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

    // const memoChildren = useMemo(()=><Child></Child>,[])
    console.log('r')
    const {addItemToFavorite, deleteItemFromFavorite} = useActions()

    return (
        <div className={styles.item} ref={itemRef} id={String(item.id)}>
            <DynamicFavoriteButton deleteItemFromFavorite={deleteItemFromFavorite} addItemToFavorite={addItemToFavorite}
                                   isFavorite={isFavorite} item={item}/>
            <div className={styles.image}>
                <Image src={item.image_url} alt=''  fill/>
            </div>
            {children ? (
                    <div className={styles.content}>
                        {children}
                    </div>
                ) :
                null
            }
        </div>
    );
};

export default CustomSliderItemWithFavorites;