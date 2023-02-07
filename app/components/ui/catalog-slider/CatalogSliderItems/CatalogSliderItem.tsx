import React, {FC} from 'react';
import styles from '../CatalogSlider.module.scss'
import Image from "next/image";

const CatalogSliderItem: FC = ({item}) => {
    console.log('cat rendered')
    return (
        <div className={styles.sliderItem} id={item.id}>
            <div className={styles.slideWrapper}>
                <div className={styles.sliderImageWrapper}>
                    <Image src={item.image_url} alt='' width='400' height='300'/>
                </div>
            </div>
        </div>
    );
};

export default CatalogSliderItem;