import React, {FC} from 'react';
import styles from './TopHeader.module.scss'
import {MdKeyboardArrowDown} from "react-icons/md";

const TopHeader:FC = () => {
    return (
        <div className={styles.wrapper} id='top-header'>
            <div className={styles.flexWrapper}>
                <div className={styles.leftBlock}>
                    <a className={styles.link}>Yorcom.Club</a>
                    <a className={styles.link}>Магазины</a>
                    <a className={styles.link}>Для бизнеса</a>
                </div>
                <div className={styles.rightBlock}>
                    <a className={styles.link}>Заказать образцы тканей</a>
                    <a className={styles.link}>Обратный звонок <MdKeyboardArrowDown /></a>
                </div>
            </div>


        </div>
    );
};

export default TopHeader;