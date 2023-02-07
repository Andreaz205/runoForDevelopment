import React, {FC, useCallback, useEffect, useRef} from 'react';
import styles from "./CatalogItem.module.scss";
import Price from "../../Price/Price";
import Popup from "./Popup/Popup";
import CatalogItemTitle from "./CatalogItemTitle/CatalogItemTitle";
import SeeButton from "./SeeButton/SeeButton";
import cn from "classnames";
import DesktopImage from "@/ui/Catalog/DesktopImage/DesktopImage";

export interface ICatalogItemProps {
    setHoveredId: (id: number|null) => void
    elementId: number
    hoveredId: number|null
}

const CatalogItem:FC<ICatalogItemProps> = ({setHoveredId, elementId, hoveredId, item}) => {
    const catalogItemRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const ref = useRef<HTMLDivElement>(null)

    const mouseEnterCallback = () => {
        setHoveredId(elementId)
        catalogItemRef.current!.style.zIndex = '3'
    }

    const mouseLeaveCallback = () => {
        catalogItemRef.current!.style.zIndex = '1'
        setHoveredId(null)
    }

    const title = useCallback(() => {
        let name =''
        item?.variantValues?.map(el => {
            name += ' ' + el.title
        })
        return name
    }, [item])

    useEffect(() => {
        catalogItemRef?.current?.addEventListener('mouseover', mouseEnterCallback)
        ref?.current?.addEventListener('mouseleave', mouseLeaveCallback)

        return () => {
            catalogItemRef?.current?.removeEventListener('mouseover', mouseEnterCallback)
            ref?.current?.removeEventListener('mouseleave', mouseLeaveCallback)

        }
    }, [catalogItemRef])

    return (
        <div className={styles.catalogItem} ref={ref}>

            <Popup active={hoveredId === elementId} setHoveredId={setHoveredId} popupRef={popupRef} title={title} item={item}/>

            <div className={styles.content}>
                <div className={cn(styles.image, {[styles.active]: hoveredId === elementId})} ref={catalogItemRef}>
                    <DesktopImage item={item} images={item.images} hoveredId={hoveredId} catalogItemId={elementId}/>
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