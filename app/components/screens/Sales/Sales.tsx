import React, {FC} from 'react';
import Image from "next/image";
import styles from './Sales.module.scss'
import SaleItem from "@/ui/sales/SaleItem/SaleItem";

export interface ISale {
    id: 1,
    title: string,
    is_public: boolean
    image_url: string
    image_path: string
    created_at: string
    updated_at: string
}

const Sales: FC<{ sales: ISale[] }> = ({sales}) => {
    return (
        <div className={styles.sales}>
            {sales && sales.length && sales.map(sale => (
                <SaleItem sale={sale} key={sale.id}/>
            ))}
        </div>
    );
};

export default Sales;