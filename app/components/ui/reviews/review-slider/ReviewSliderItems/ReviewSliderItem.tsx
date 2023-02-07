import React, {FC, useCallback, useMemo, useState} from 'react';
import styles from '../ReviewSlider.module.scss'
import divan from '/public/images/divan.jpg'
import Image from "next/image";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import dynamic from "next/dynamic";



const ReviewSliderItem: FC = ({item}) => {
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

export default ReviewSliderItem;