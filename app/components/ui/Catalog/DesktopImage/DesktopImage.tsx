import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './DesktopImage.module.scss'

import useWindowSize from "../../../../hooks/useWindowSize";
import Image from "next/image";
import Photo from "./Photo/Photo";
import Area from "./Area/Area";
import Link from "next/link";

export interface IImage{
    id: number,
    path: string
}

const DesktopImage:FC<{images: IImage[], hoveredId: number, catalogItemId: number}>= ({images, hoveredId, catalogItemId, item}) => {
    const {width} = useWindowSize()
    const areaRef = useRef<HTMLAnchorElement>(null)
    const [activeId, setActiveId] = useState(images[0].id)

        // if (activeId === ) {
            // areaRef.current!.style.cssText = `width: ${100/GridImages.length}%; border: 1px solid black; height: 100%;`
        // }

    return (
        <Link href={`/products/${item.id}`} className={styles.wrapper} ref={areaRef}>
            <div className={styles.areas}>
                {images.map(image => (
                    <Area images={images} width={100/images.length} key={image.id} setActiveId={setActiveId} elementId={image.id} activeId={activeId} hoveredId={hoveredId} catalogItemId={catalogItemId}/>
                ))}
            </div>
            {images.map(image => (
                <Photo key={image.id} image={image} width={width} activeId={activeId}/>
            ))}
        </Link>
    );
};

export default DesktopImage;