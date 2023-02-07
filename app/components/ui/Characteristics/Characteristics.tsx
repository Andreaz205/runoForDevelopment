import React, {FC} from 'react';
import styles from './Characteristics.module.scss'
import Sizes from "@/ui/Sizes/Sizes";

const Characteristics :FC= () => {
    return (
        <div className={styles.characteristics}>
            <div className={styles.header}>Характеристики</div>
            <div className={styles.flexBlock}>
                <div className={styles.leftBlock}>
                    <div className={styles.sizes}>Размеры</div>
                    <Sizes fill/>
                    <div className={styles.sizes}>Спальное место</div>
                    <Sizes fill/>
                    <div className={styles.sizes}>Спальное место</div>
                    <div>

                    </div>
                </div>
                <div className={styles.rightBlock}>

                </div>
            </div>

        </div>
    );
};

export default Characteristics;