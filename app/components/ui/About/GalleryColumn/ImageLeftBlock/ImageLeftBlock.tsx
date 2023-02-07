import React, {FC} from 'react';
import styles from './ImageLeftBlock.module.scss'
import Image from "next/image";

const ImageLeftBlock:FC<{children: React.ReactNode, imageUrl: string}>= ({children, imageUrl}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <Image src={imageUrl} alt='' fill/>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default ImageLeftBlock;