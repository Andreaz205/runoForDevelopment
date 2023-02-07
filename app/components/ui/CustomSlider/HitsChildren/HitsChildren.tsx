import React, {FC, useMemo} from "react";
import styles from './HitsChildren.module.scss'

const HitsChildren :FC<{title: string, price: number}> = ({title, price})  => {
    console.log('children rendered')
    return (
        <div className={styles.title}>
            <div className={styles.title}>{title}</div>
            <div className={styles.price}>{price}</div>
        </div>
    )
}


export default HitsChildren