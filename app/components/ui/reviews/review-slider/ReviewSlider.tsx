import React, {FC} from 'react';
import styles from './ReviewSlider.module.scss'
import {ISliderItem} from "@/ui/slider/slider.interface";
import ReviewSliderItems from "@/ui/reviews/review-slider/ReviewSliderItems/ReviewSliderItems";

const ReviewSlider:FC<{ items: ISliderItem[] }> = ({items}) => {
    return (
        <div className={styles.sliderWrapper}>
            <ReviewSliderItems items={items}/>
        </div>
    );
};

export default ReviewSlider;