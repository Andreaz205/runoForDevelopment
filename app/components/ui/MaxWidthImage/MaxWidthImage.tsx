import React, {FC} from 'react';
import styles from './MaxWidthImage.module.scss'
import Image from "next/image";

const MaxWidthImage:FC<{src: string}>= ({src}) => {
    return (
        <div className={styles.imageWrapper}>
            <Image src={src} alt={''} fill/>
        </div>
    );
};

export default MaxWidthImage;