import React, {FC, useEffect, useRef} from 'react';
import styles from './Photo.module.scss'
import {IImage} from "../../../screens/product/Product";
import Image from "next/image";
import cn from "classnames";

const Photo :FC<{image: IImage, width?: number, activeId: number}> = ({image, activeId}) => {
    // useEffect(() => {
    //     if (image.id === activeId && ref.current) {
    //
    //     }
    // }, [activeId, image])
    return (
        <div className={cn(styles.photo, {[styles.visible]: activeId === image.id})}>
            <Image src={`/storage/${image.path}`} alt='' fill />
        </div>
    );
};

export default Photo;