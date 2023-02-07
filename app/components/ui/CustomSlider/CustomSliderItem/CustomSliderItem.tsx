import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {IItem} from "../CustomSlider";
import styles from './CustomSliderItem.module.scss'
import Image from "next/image";


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


const CustomSliderItem:FC<ISliderItemProps & {children: React.ReactNode}> = ({
    item,
    width,
    height,
    isMobile,
    mr,
    mobH,
    children,
    borderRadius,
    imagePercents
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
        if (itemRef.current && borderRadius !== undefined) {
            itemRef.current.style.borderRadius = borderRadius + 'px'
        }
        if (imageRef.current && imagePercents && contentRef.current) {
            imageRef.current.style.height = imagePercents + '%'
            contentRef.current.style.height = 100 - imagePercents + '%'
        }

    }, [imageRef.current, itemRef.current, isMobile, width, height, contentRef.current])

    console.log('r')

    return (
        <div className={styles.item} ref={itemRef} id={String(item.id)}>
            <div className={styles.image} ref={imageRef}>
                <Image src={item?.image_url} alt=''  fill/>
            </div>
            {children ? (
                <div className={styles.content} ref={contentRef}>
                    {children}
                </div>
            ) :
                null
            }
        </div>
    );
};

export default CustomSliderItem;