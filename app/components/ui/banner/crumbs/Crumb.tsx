import React, {FC} from 'react';
import styles from './Crumbs.module.scss'
import cn from 'classnames'

const Crumb :FC = ({imageId, activeIndex, slideTo, width, setCurrentIndex, setX}) => {

    const handleClick = () => {
        slideTo(imageId, width)
        setCurrentIndex(imageId)
        setX(-imageId * width)
    }

    return (
        <div className={cn(styles.crumb, {[styles.active]: activeIndex == imageId})} onClick={() => handleClick()}>

        </div>
    );
};

export default Crumb;