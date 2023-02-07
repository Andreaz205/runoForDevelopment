import React, {FC} from 'react';
import styles from "./Crumbs.module.scss";
import Crumb from "@/ui/banner/crumbs/Crumb";


const Crumbs :FC= ({bannerImages, activeIndex, slideTo, width, setCurrentIndex, setX}) => {
    return (
        <div className={styles.crumbsContainer}>
            <div className={styles.crumbs}>
                {bannerImages.map(image => (
                    <Crumb key={image.id} imageId={image.id} activeIndex={activeIndex} slideTo={slideTo} width={width} setCurrentIndex={setCurrentIndex} setX={setX}/>
                ))}
            </div>
        </div>
    )
};

export default Crumbs;