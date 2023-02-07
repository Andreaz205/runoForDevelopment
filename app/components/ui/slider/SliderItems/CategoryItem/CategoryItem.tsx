import React, {FC, useMemo, useState} from "react";
import styles from "@/ui/slider/SliderItems/CategoryItem/CategoryItem.module.scss";
import Image from "next/image";

const SliderItem: FC = ({item}) => {
    return (
        <div className={styles.sliderItem} id={item.id}>
            <div className={styles.slideWrapper}>
                <div className={styles.sliderImageWrapper}>
                    <Image src={item.imagePath} alt='' width='400' height='300'/>
                    <div className={styles.title}>
                        {item.title}
                    </div>
                    <div className={styles.priceBlock}>
                        <div className={styles.price}>От {item.price} P</div>
                    </div>
                </div>

                {/*<div>*/}
                {/*    sale*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default SliderItem;