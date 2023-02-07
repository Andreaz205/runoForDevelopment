import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from "./CatalogItem.module.scss";
import Price from "@/ui/Price/Price";
import Popup from "./Popup/Popup";
import CatalogItemTitle from "./CatalogItemTitle/CatalogItemTitle";
import SeeButton from "./SeeButton/SeeButton";
import cn from "classnames";
import DesktopImage from "@/screens/Catalog/DesktopImage/DesktopImage";

export interface ICatalogItemProps {
    setHoveredId: (id: number|null) => void
    elementId: number
    hoveredId: number|null
}

const CatalogItem:FC<ICatalogItemProps> = ({elementId, item}) => {
    const catalogItemRef = useRef<HTMLDivElement>(null)
    // const popupRef = useRef<HTMLDivElement>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // const mouseEnterCallback = () => {
    //     catalogItemRef.current!.style.zIndex = '3'
    //     setIsHovered(true)
    // }
    //
    // const mouseLeaveCallback = () => {
    //     setIsHovered(false)
    //     catalogItemRef.current!.style.zIndex = '1'
    // }

    const title = useCallback(() => {
        let name = item.product.title
        item?.variantValues.map(el => {
            name += ' ' + el.title
        })
        return name
    }, [item])

    // useEffect(() => {
    //     catalogItemRef?.current?.addEventListener('mouseover', mouseEnterCallback)
    //     ref?.current?.addEventListener('mouseleave', mouseLeaveCallback)
    //
    //     return () => {
    //         catalogItemRef?.current?.removeEventListener('mouseover', mouseEnterCallback)
    //         ref?.current?.removeEventListener('mouseleave', mouseLeaveCallback)
    //
    //     }
    // }, [catalogItemRef])


    return (
        <div className={styles.catalogItem} ref={ref}>

            {/*{isHovered && <Popup popupRef={popupRef} title={title} item={item}/>}*/}

            <div className={styles.content}>
                <div className={cn(styles.image, {[styles.active]: isHovered})} ref={catalogItemRef}>
                    <DesktopImage item={item} images={item.images} catalogItemId={elementId}/>
                </div>
                {/*<div className={cn(styles.image, {[styles.active]: hoveredId === elementId})} ref={catalogItemRef}></div>*/}
                <div>
                    <CatalogItemTitle title={title()} />
                    <Price price={item.price} oldPrice={35990} sale={20} priceFontSize={20} width={'90%'} mt={5} />
                    <SeeButton />
                </div>
            </div>
        </div>
    );
};

export default CatalogItem;