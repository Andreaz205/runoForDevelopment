import React, {FC} from 'react';
import styles from "./SeeButton.module.scss";

const SeeButton :FC= () => {
    return (
        <button className={styles.about}>
            Посмотреть
        </button>
    );
};

export default SeeButton;