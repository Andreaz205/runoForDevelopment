import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import styles from "@/ui/galleries/VariantGallery/ImagesLine/GalleryImage/GalleryImage.module.scss";
import Image from "next/image";
import cn from "classnames";
import {IImages} from "@/ui/galleries/VariantGallery/ImagesLine/VerticalImagesLine";

const GalleryImage: FC<{ image: any, isActive: boolean, setActiveImageIndex: Dispatch<SetStateAction<number>>, setStartIndex: Dispatch<SetStateAction<number>>, setY: Dispatch<SetStateAction<number>>, fullItemWidth: number, trackRef: any, images: IImages[], lastAllowedImageIndex?: number }> = ({
    image,
    isActive,
    setActiveImageIndex,
    fullItemWidth,
    setStartIndex,
    setY,
    trackRef,
    images,
    lastAllowedImageIndex
}) => {
    const ref = useRef<any>()
    const [timer, setTimer] = useState()
    let [flag, setFlag] = useState(false)

// Эта хуйня чтобы при слайде не активироваплась картинка

    const onClick = (e: any) => {
        setFlag(true)
        let newTimer: any = setTimeout(() => {
            setActiveImageIndex(image.id)
        }, 10)
        setTimer(newTimer)
        let elementIndex = images.indexOf(image)
        console.log(lastAllowedImageIndex)
        if (lastAllowedImageIndex && elementIndex >= lastAllowedImageIndex) {
            setStartIndex(lastAllowedImageIndex)
            setY(-(lastAllowedImageIndex * fullItemWidth))
            if (trackRef.current) trackRef.current.style.cssText = `transform: translateY(${-(lastAllowedImageIndex * fullItemWidth)}px)`
        } else {
            setStartIndex(elementIndex)
            setY(-(elementIndex * fullItemWidth))
            if (trackRef.current) trackRef.current.style.cssText = `transform: translateY(${-(elementIndex * fullItemWidth)}px)`
        }

    }

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('mousemove', mousemoveCallback)
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousemove', mousemoveCallback)
            }
        }
    }, [flag, onClick])

    const mousemoveCallback = (e: any) => {
        if (timer) clearTimeout(timer)
        setFlag(false)
    }

    return (
        <div className={cn(styles.lineImageWrapper, {[styles.active]: isActive})} onClick={(e) => onClick(e)} ref={ref}>
            <div className={styles.image}>
                <Image src={image.original} alt='Image' fill/>
            </div>
        </div>
    );
};

export default GalleryImage;