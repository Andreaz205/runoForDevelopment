import React, {FC} from 'react';
import styles from "./Delivery.module.scss"

const Delivery :FC = () => {
    return (
        <div className={styles.delivery}>
            <span className={styles.title}>Доставка</span>
            <div className={styles.flexBlock}>
                <div className={styles.item}>
                    <span>по Челябинску</span>
                    <span>700 Р</span>
                </div>
                <div className={styles.item}>
                    <span>по России</span>
                    <span>от 1000 P</span>
                </div>
                <div className={styles.item}>
                    <span>Самовывоз</span>
                    <span>Бесплатно</span>
                </div>
            </div>
        </div>
    );
};

export default Delivery;