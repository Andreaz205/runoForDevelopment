import React, {FC, useEffect, useRef} from 'react';
import styles from "./Sizes.module.scss";

const Sizes :FC<{fill?: boolean}> = ({fill}) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref && fill) {
            ref.current!.style.maxWidth = '100%'
        }
    }, [ref])
    return (
        <div className={styles.sizes} ref={ref}>
            <div className={styles.sizeHeaders}>
                <div className={styles.headerItem}>Длина</div>
                <div className={styles.headerItem}>Ширина</div>
                <div className={styles.headerItem}>Высота</div>
            </div>
            <div className={styles.sizeValues}>
                <div className={styles.value}>210 см</div>
                <div className={styles.xSpace}>х</div>
                <div className={styles.value}>150 см</div>
                <div className={styles.xSpace}>х</div>
                <div className={styles.value}>50 см</div>
            </div>
            <div className={styles.line}></div>
        </div>
    );
};

export default Sizes;