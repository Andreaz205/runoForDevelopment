import React, {FC, useEffect} from 'react';
import cn from "classnames";
import styles from "./Popup.module.scss";
import CatalogItemTitle from "../CatalogItemTitle/CatalogItemTitle";
import Price from "@/ui/Price/Price";
import SeeButton from "../SeeButton/SeeButton";
import Sizes from "@/ui/Sizes/Sizes";

export interface IPopupProps {
    active: boolean,
    setHoveredId: (id: null) => void,
    popupRef: InstanceType<any>
}

const Popup: FC<IPopupProps> = ({
   active,
   setHoveredId,
   popupRef,
    title,
    item
}) => {

    useEffect(() => {
        popupRef?.current?.addEventListener('mouseleave', mouseLeaveCallback)
        return () => {
            popupRef?.current?.removeEventListener('mouseleave', mouseLeaveCallback)
        }
    }, [popupRef])

    const mouseLeaveCallback = () => {
        setHoveredId(null)
    }

    return (
        <div className={cn(styles.hovered, {[styles.active]: active})} ref={popupRef}>
            <div className={styles.verticalIndent}></div>
            <div className={styles.popupContentWrapper}>
                <CatalogItemTitle title={title()}/>
                <Price price={item.price} oldPrice={35990} sale={20} priceFontSize={20} width={'90%'} mt={5}/>
                <SeeButton/>
                <div className={styles.sizeTitle}>Размер</div>
                <Sizes />
                <button className={styles.cartButton}>
                    В корзину
                </button>
                <div className={styles.details}>
                    <a href="@/screens/Catalog/CatalogItem/Popup/Popup#">подробнее о товаре</a>
                </div>

            </div>

        </div>
    );
};

export default Popup;