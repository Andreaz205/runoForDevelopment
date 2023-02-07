import React, {FC} from 'react';
import {ISale} from "@/screens/Sales/Sales";
import Image from "next/image";
import styles from './SaleItem.module.scss'


const SaleItem :FC<{sale: ISale}>= ({sale}) => {
    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <Image src={sale.image_url} alt={sale.title} fill/>
            </div>
            <div>
                {sale.title}
            </div>
        </div>
    );
};

export default SaleItem;