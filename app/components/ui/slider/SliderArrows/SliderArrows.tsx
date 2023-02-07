import React, {FC} from 'react';
import styles from './SliderArrows.module.scss'
import {HiArrowRight, HiArrowLeft} from "react-icons/hi";

const SliderArrows:FC = ({slideLeft, slideRight}) => {
    return (
        <div className={styles.arrowsWrapper}>
            <div className={styles.arrowsBlock}>
                <div className={styles.arrowLeft} onClick={() => slideLeft()}>
                    <HiArrowLeft />
                </div>
                <div className={styles.arrowRight} onClick={() => slideRight()}>
                    <HiArrowRight />
                </div>
            </div>
        </div>
    );
};

export default SliderArrows;