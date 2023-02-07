import React, {FC, useMemo} from 'react';
import styles from './Slider.module.scss'
import {ISliderItem} from "@/ui/slider/slider.interface";
import SliderItems from "@/ui/slider/SliderItems/SliderItems";
import {useTypedSelector} from "@/hooks/useTypedSelector";


const Slider:FC<{ items: ISliderItem[],height?: number }> = ({items, height}) => {


    return (
        <div className={styles.sliderWrapper}>
            <SliderItems items={items} height={height}/>
        </div>
    );
};

export default Slider;