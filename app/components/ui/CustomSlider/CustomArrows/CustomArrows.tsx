import React, {FC, useCallback, useState} from 'react';
import styles from './CustomArrows.module.scss'
import {TbArrowNarrowLeft, TbArrowNarrowRight} from 'react-icons/tb'

const CustomArrows :FC<{slide: (argument: 'right'|'left') => void}> = ({slide}) => {
    const [timer, setTimer] = useState<any>()
    const clickCallback = useCallback((direction: 'left' | 'right') => {
        if (timer) return
        let newTimer = setTimeout(() => setTimer(null), 300)
        setTimer(newTimer)
        slide(direction)
    }, [timer])
    return (
        <div className={styles.arrows}>
            <div className={styles.box}>
                <div className={styles.arrow} onClick={() => clickCallback('left')}>
                    <TbArrowNarrowLeft />
                </div>
                <div className={styles.arrow} onClick={() => clickCallback('right')}>
                    <TbArrowNarrowRight />
                </div>
            </div>
        </div>
    );
};

export default CustomArrows;