import React, {FC} from 'react';
import styles from './CatalogSlider.module.scss'
import {ISliderItem} from "@/ui/slider/slider.interface";
import CatalogSliderItems from "@/ui/catalog-slider/CatalogSliderItems/CatalogSliderItems";


const CatalogSlider:FC<{ items: ISliderItem[] }> = ({items}) => {


    return (
        <div className={styles.sliderWrapper}>
            <CatalogSliderItems items={items}/>
        </div>
    );
};

export default CatalogSlider;