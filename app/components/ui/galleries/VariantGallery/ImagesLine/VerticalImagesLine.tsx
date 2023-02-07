import React, {
    Dispatch,
    ElementRef,
    FC,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import styles from './VerticalImagesLine.module.scss'
import Image from "next/image";
import {SlArrowDown, SlArrowUp} from "react-icons/sl";
import {getTransformValue} from "@/utils/getTransformValue";
import useWindowSize from "@/hooks/useWindowSize";
import {transform} from "terser-webpack-plugin/types/minify";
import {useRouter} from "next/router";
import GalleryImage from "@/ui/galleries/VariantGallery/ImagesLine/GalleryImage/GalleryImage";


export interface IImages{
    id: number
    original: string
}

const VerticalImagesLine:FC<{images: IImages[], activeImageIndex: number, setActiveImageIndex: Dispatch<SetStateAction<number>>, y: number, setY: Dispatch<SetStateAction<number>>, trackHeight: number}> = ({
    images,
    activeImageIndex,
    setActiveImageIndex,
    y,
    setY,
    trackHeight
}) => {
    const trackRef = useRef<HTMLDivElement | null>(null)
    const lineRef = useRef<HTMLDivElement | null>(null)
    const [lineHeight, setLineHeight] = useState<number>()
    const [lastAllowedImageIndex, setLastAllowedImageIndex] = useState<number>()
    const [startIndex, setStartIndex] = useState<number>(0)

    let indent = 20
    let itemWidth = 150
    let mr = 10

    let fullItemWidth= itemWidth + mr

    let size = useWindowSize()

    const {asPath} = useRouter()

    useEffect(() => {
        if (lineRef.current) {
            setLineHeight(lineRef.current.clientHeight)
        }
    }, [size, lineRef, asPath])

    useEffect(() => {
        setActiveImageIndex(images[0].id)
    }, [images.length])

    useEffect(() => {
        if (lineHeight) {
            let itemsIsPresent = Math.trunc(lineHeight / (itemWidth + mr))
            let lastIdx = 0
            if (itemsIsPresent < images.length) {
                lastIdx = (images.length - itemsIsPresent)
            }
            setLastAllowedImageIndex(lastIdx)
        }
    }, [lineHeight, asPath, images.length])

    useEffect(() => {
        lineRef.current?.addEventListener('mousedown', swipeStart)
        lineRef.current?.addEventListener('touchstart', swipeStart)
        return () => {
            lineRef.current?.removeEventListener('mousedown', swipeStart)
            lineRef.current?.removeEventListener('touchstart', swipeStart)
        }
    }, [lineRef])

    useEffect(() => {
        // @ts-ignore
        document.imagesCount = images.length
    }, [images.length, asPath])

    // console.log(lastAllowedImageIndex)
    useEffect(() => {
        setStartIndex(0)
        setY(0)
        if (trackRef.current) trackRef.current.style.cssText = `transform: translateY(0)px)`
    }, [asPath])

    const slideTop = useCallback(() => {
        if (y >= 0) return
        if (trackRef.current) {
            trackRef.current.style.cssText = `transform: translateY(${y + (itemWidth + mr)}px)`
            setY(y + (itemWidth + mr))
            setStartIndex(startIndex - 1)
        }
    }, [startIndex, y, trackRef])

    const slideBottom = useCallback(() => {
        // @ts-ignore
        if (startIndex >= lastAllowedImageIndex) return
        if (trackRef.current) {
            trackRef.current.style.cssText = `transform: translateY(${y - (itemWidth + mr)}px)`
            setY(y - (itemWidth + mr))
            setStartIndex(startIndex + 1)
        }
    }, [lastAllowedImageIndex, y, startIndex, trackRef, asPath])


    const align = (y: number, initialTransform: number, prevIdx: number, lineHeight: number) => {
        // @ts-ignore
        let imagesCount = document.imagesCount

        let itemsIsPresent = Math.trunc(lineHeight / (itemWidth + mr))
        let lastIdx = 0
        if (itemsIsPresent < imagesCount) {
            lastIdx = (imagesCount - itemsIsPresent)
        }
        setLastAllowedImageIndex(lastIdx)

        let direction: 'top' | 'bottom'
        if (-y > -initialTransform) {
            direction = 'bottom'
        } else {
            direction= 'top'
        }
        if (direction === 'bottom') {
            if (-y + initialTransform <= indent) {
                if (trackRef.current) {
                    trackRef.current.style.cssText = `transform: translateY(-${prevIdx * (itemWidth + mr)}px)`
                    setY(-(prevIdx * (itemWidth + mr)))
                }
            }
            else {
                if (trackRef.current) {
                    let newStartIndex = Math.trunc(-y / (itemWidth+mr)) + 1
                    if (newStartIndex >= lastIdx) {
                        setY(-(lastIdx * (itemWidth + mr)))
                        setStartIndex(lastIdx)
                        return trackRef.current.style.cssText = `transform: translateY(-${lastIdx * (itemWidth + mr)}px)`
                    }
                    trackRef.current.style.cssText = `transform: translateY(-${newStartIndex * (itemWidth + mr)}px)`
                    setStartIndex(newStartIndex)
                    setY(-(newStartIndex  * (itemWidth + mr)))
                }
            }
        } else {
         if (-y + initialTransform >= -indent) {
             if (trackRef.current) {
                 setY(-((prevIdx + 1) * (itemWidth + mr)))
                 trackRef.current.style.cssText = `transform: translateY(-${(prevIdx + 1) * (itemWidth + mr)}px)`
             }
         } else {
            if (trackRef.current) {
                let newStartIndex = Math.trunc(-y / (itemWidth+mr))
                trackRef.current.style.cssText = `transform: translateY(-${newStartIndex * (itemWidth + mr)}px)`
                setStartIndex(newStartIndex)
                setY(-(newStartIndex * (itemWidth + mr)))
            }}
        }
    }

    const swipeStart = (e: any) => {
        // @ts-ignore
        document.initPos = e.clientY
        // @ts-ignore
        document.transform = getTransformValue(trackRef.current)

        document.addEventListener('mouseup', swipeEnd)
        document.addEventListener('mousemove', swipeAction)
    }

    const swipeEnd = (e: any) => {
        document.removeEventListener('mouseup', swipeEnd)
        document.removeEventListener('mousemove', swipeAction)
        align(e.currentTarget.y, e.currentTarget.initialTransform, e.currentTarget.prevIdx, e.currentTarget.lineHeight)
    }

    const swipeAction = (e: any) => {
        let transform = e.currentTarget.transform
        let track = trackRef.current
        let initPos = e.currentTarget.initPos
        let length = transform - (initPos - e.clientY)
        track!.style.cssText = `transform: translateY(${length}px)`
        setY(length)
        // @ts-ignore
        document.initialTransform = e.currentTarget.transform
        // @ts-ignore
        document.y = length
        // @ts-ignore
        document.prevIdx = -Math.trunc(length / (itemWidth + mr))
        // @ts-ignore
        document.lineHeight = lineRef.current?.clientHeight
    }


    return (
        <div className={styles.wrapper}>

            <div className={styles.arrowTop}>
                <button onClick={() => slideTop()}>
                    <SlArrowUp />
                </button>
            </div>

            <div className={styles.area} ref={lineRef}>
                <div className={styles.track} ref={trackRef}>
                    {images && images.length && images.map(image => (
                        <GalleryImage
                            image={image}
                            key={image.id}
                            isActive={activeImageIndex === image.id}
                            setActiveImageIndex={setActiveImageIndex}
                            setStartIndex={setStartIndex} setY={setY}
                            fullItemWidth={fullItemWidth}
                            trackRef={trackRef}
                            images={images}
                            lastAllowedImageIndex={lastAllowedImageIndex}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.arrowBottom}>
                <button onClick={() => slideBottom()}>
                    <SlArrowDown />
                </button>
            </div>

        </div>
    );
};

export default VerticalImagesLine;