import React, {FC, useEffect, useRef} from 'react';
import styles from "./Price.module.scss";
import Image from "next/image";
import saleImg from '/public/sale.png'

export interface IPriceProps {
    priceFontSize?: number,
    price: number,
    oldPrice?: number,
    oldPriceFontSize?: number,
    sale?: number,
    saleFontSize?: number
    width?: string
    mt?: number
}

const Price: FC<IPriceProps> = ({
    price,
    oldPrice,
    sale,
    priceFontSize,
    width,
    mt
}) => {
    const priceRef = useRef<HTMLDivElement>(null)
    const areaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!!priceFontSize) {
            if (priceRef.current !== null && !!priceRef.current.style) {
                priceRef.current.style.fontSize = `${priceFontSize}px`
            }
        }
    }, [priceRef, priceFontSize])

    useEffect(() => {
        if (!!mt) {
            if (areaRef.current !== null && !!areaRef.current.style) {
                areaRef.current.style.marginTop = `${mt}px`
            }
        }
    }, [areaRef, mt])

    useEffect(() => {
        if (!!width) {
            if (areaRef.current !== null && !!areaRef.current.style) {
                if (width.includes('%')) {
                    let percentWidth = width.split('%')[0]
                    areaRef.current.style.width = `${percentWidth}%`
                } else {
                    areaRef.current.style.width = `${Number(width)}px`
                }
            }
        }
    }, [areaRef, width])

    return (
        <div className={styles.priceArea} ref={areaRef}>
            <div className={styles.price} ref={priceRef}>{price} P</div>
            {oldPrice && <div className={styles.oldPrice}>{oldPrice} P</div>}
            {sale && (
                <div className={styles.sale}>
                    <span>{sale}%</span>
                    <Image src={saleImg.src} alt='' width='60' height='26'/>
                </div>
            )}
        </div>
    );
};

export default Price;