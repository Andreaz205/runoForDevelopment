import React, {FC} from 'react';
import {ISliderItems} from "../../../../pages";
import styles from "./RelatedVariants.module.scss";
import Slider from "@/ui/slider/Slider";
import CustomSlider from "@/ui/CustomSlider/CustomSlider";

const RelatedVariants :FC<{related: ISliderItems[]}> = ({related}) => {

    if (related && related.length) {
        return (

            <div className={styles.relatedVariants}>
                <div className={styles.title}>
                    С этим покупают:</div>
                    <CustomSlider items={related} />
            </div>
        )
    }
    return null
};

export default RelatedVariants;