import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import styles from './VariantGallery.module.scss'
import VerticalImagesLine from "@/ui/galleries/VariantGallery/ImagesLine/VerticalImagesLine";
import Image from "next/image";
import {useRouter} from "next/router";

//Высота = 150px
// margin-top = 10px

const VariantGallery :FC = ({images}) => {
    const [activeImageIndex, setActiveImageIndex] = useState<number>(images[0].id)
    const [y, setY] = useState<number>(0)
    const trackHeight = useMemo(() => images?.length * (150 + 10), [images])

    const {asPath} = useRouter()

    let activeImage = useMemo(() => {
        return images.find(image => image.id === activeImageIndex)
    }, [activeImageIndex, images])

    useEffect(() => {
        setActiveImageIndex(images[0].id)
    }, [images, asPath])

    return (
        <div className={styles.galleryWrapper}>
            <div className={styles.bigImage}>
                <div className={styles.imageContainer}>
                    {activeImage?.original && <Image src={activeImage?.original} alt='' fill/>}
                </div>
            </div>
            <VerticalImagesLine
                images={images}
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
                y={y}
                setY={setY}
                trackHeight={trackHeight}
            />
        </div>
    );
};

export default VariantGallery;