import React, {ElementRef, FC, RefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import CustomSliderItem from "./CustomSliderItem/CustomSliderItem";
import styles from './CustomSlider.module.scss'
import useWindowSize from "@/hooks/useWindowSize";
import CustomArrows from "./CustomArrows/CustomArrows";
import CustomScrollbar from "./CutomScrollbar/CustomScrollbar";
import {getTransformValue} from "@/utils/getTransformValue";
import {useRouter} from "next/router";
import CustomSliderItemWithFavorites from "@/ui/CustomSlider/CustomSliderItem/CustomSliderItemWidthFavorites";
import HitsChildren from "@/ui/CustomSlider/HitsChildren/HitsChildren";

export interface IItem {
    price: number;
    title: string;
    id: number
    image_url: string
}

const MemorizedSliderItem = React.memo(CustomSliderItem)
const MemorizedArrows = React.memo(CustomArrows)
const MemorizedCustomSliderItemWithFavorites = React.memo(CustomSliderItemWithFavorites)
const MemorizedHitsChildren = React.memo(HitsChildren)

const CustomSlider :FC<{
    items: IItem[]
    , arrows?: boolean,
    scrollbar?: boolean,
    favorites?: boolean,
    borderRadius?: number,
    imagePercents?: number,
    minThreshold?: number
    initWidth?: number
    initHeight?: number
    marginRight?: number
    mobileHeight?: number
    mobileBreak?: number

}> = ({items, arrows= false, scrollbar = false, favorites, borderRadius, imagePercents, minThreshold, initWidth, initHeight, marginRight, mobileHeight, mobileBreak}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lastAllowedIndex, setLastAllowedIndex] = useState(0)
    const [width, setWidth] = useState(0)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    const trackRef = useRef<HTMLDivElement|null>(null)
    const trackWrapperRef = useRef<HTMLDivElement|null>(null)
    const {width: resizedWidth} = useWindowSize()
    const {push} = useRouter()

    let itemsCount = items.length

    let minimalThreshold = minThreshold ||  10
    let varW = initWidth || 420
    let height = initHeight || 300
    let mr = marginRight || 40
    let mobH = mobileHeight || 250
    let pointBreak = mobileBreak || 400

    const addAnimation = (ref: RefObject<HTMLDivElement>) => {
        if (ref && ref.current) {
            ref.current.style.transition = 'transform 0.3s ease'
            // @ts-ignore
            setTimeout(() => ref.current.style.transition = '', 300)
        }
    }

    useEffect(() => {
        if (trackWrapperRef.current) {
            if (isMobile) {
                return setLastAllowedIndex(itemsCount - 1)
            }

            let viewportWidth = trackWrapperRef.current?.offsetWidth
            let fullItemsVisible = Math.trunc(viewportWidth / (width + mr))
            if (itemsCount < fullItemsVisible) {
                return setLastAllowedIndex(0)
            }
            let lastAllowedIdx = itemsCount - fullItemsVisible
            setLastAllowedIndex(lastAllowedIdx)
        }
    }, [trackWrapperRef.current?.offsetWidth, itemsCount, width])

    useEffect(() => {
        if (trackRef.current) {
            if (trackRef.current && resizedWidth && resizedWidth > pointBreak) {
                if (isMobile) {
                    setIsMobile(false)
                }
                setWidth(varW)
            } else if (trackRef.current && resizedWidth && resizedWidth <= pointBreak) {
                setIsMobile(true)
                setWidth(resizedWidth)
            } else if (trackRef.current && trackRef.current.offsetWidth > pointBreak && !resizedWidth) {
                if (isMobile) {
                    setIsMobile(false)
                }
                setWidth(varW)
            } else if (trackRef.current && trackRef.current.offsetWidth <= pointBreak && !resizedWidth){
                setIsMobile(true)
                setWidth(trackRef.current.offsetWidth)
            }
        }

    }, [trackRef.current, resizedWidth, isMobile])

    useEffect(() => {
        trackWrapperRef.current?.addEventListener('mousedown', swipeStart)
        trackWrapperRef.current?.addEventListener('touchstart', swipeStart)
        return () => {
            trackWrapperRef.current?.removeEventListener('mousedown', swipeStart)
            trackWrapperRef.current?.removeEventListener('touchstart', swipeStart)
        }
    }, [trackWrapperRef, currentIndex, width, lastAllowedIndex])

    const swipeStart = (e: any) => {
        let id = e.target.id
        let searchedItem = items.find(item => item.id == id)
        if (searchedItem) {
            // @ts-ignore
            document.newTimer = setTimeout(() => push(searchedItem?.link || '#'), 50)
        }

        let track = trackRef.current
        let clientX
        if (e.touches && e.touches[0] && e.touches[0].clientX) {
            clientX = e.touches[0].clientX
        } else {
            clientX = e.clientX
        }
        // @ts-ignore
        document.initPos = clientX
        // @ts-ignore
        document.transform = getTransformValue(track)
        document.addEventListener('mouseup', swipeEnd)
        document.addEventListener('mousemove', swipeAction)
        document.addEventListener('touchend', swipeEnd)
        document.addEventListener('touchmove', swipeAction)
    }

    const swipeEnd = (e: any) => {
        let clientX
        if (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX) {
            clientX = e.changedTouches[0].clientX
        } else {
            clientX = e.clientX
        }
        // @ts-ignore
        let startTransform = document.initPos
        let endTransform = clientX
        let transform = getTransformValue(trackRef.current)
        if ((-endTransform + startTransform < -minimalThreshold || -endTransform + startTransform > minimalThreshold) &&  (-transform > currentIndex + minimalThreshold || -transform < currentIndex - minimalThreshold)) {
            align(transform)
        } else if (-endTransform + startTransform !== 0) {
            back()
        }
        document.removeEventListener('mouseup', swipeEnd)
        document.removeEventListener('mousemove', swipeAction)
        document.removeEventListener('touchend', swipeEnd)
        document.removeEventListener('touchmove', swipeAction)
    }

    console.log('render')

    const swipeAction = (e: any) => {
        // @ts-ignore
        let timer = document?.newTimer

        if (timer) {
            clearTimeout(timer)
        }
        let clientX
        if (e.touches && e.touches[0] && e.touches[0].clientX) {
            clientX = e.touches[0].clientX
        } else {
            clientX = e.clientX
        }
        let transform = e.currentTarget.transform
        let track = trackRef.current
        let initPos = e.currentTarget.initPos
        // @ts-ignore
        document.finishTransform = getTransformValue(track)
        track!.style.transform = `translateX(${transform - (initPos - clientX)}px)`

    }

    const back = () => {
        if (trackRef.current) {
            addAnimation(trackRef)
            trackRef.current.style.transform = `translateX(${-currentIndex * (width + mr)}px)`
        }
    }

    let align = (transform: number) => {
        let initPos = currentIndex * (width + mr)
        let deltaX = -transform - initPos
        let deltaIndexes = 0
        if (-transform > initPos) {
            deltaIndexes = Math.trunc(deltaX / (width + mr)) + 1
        } else {
            deltaIndexes = Math.trunc(deltaX / (width + mr)) - 1
        }
        addAnimation(trackRef)
        let newIndex = currentIndex + deltaIndexes
        if (newIndex < 0) {
            setCurrentIndex(0)
            return trackRef.current!.style.transform = `translateX(0px)`
        } else if (newIndex > lastAllowedIndex) {
            setCurrentIndex(lastAllowedIndex)
            return trackRef.current!.style.transform = `translateX(${-lastAllowedIndex * (width + mr)}px)`
        }
        trackRef.current!.style.transform = `translateX(${-newIndex * (width + mr)}px)`
        setCurrentIndex(newIndex)
    }

    const slide = useCallback((direction: 'right' | 'left') => {
            if (trackRef.current) {
                let newIndex = 0
                if (direction === 'right') {
                    newIndex = currentIndex + 1
                } else {
                    newIndex = currentIndex - 1
                }
                if (newIndex < 0) return
                if (newIndex > lastAllowedIndex) return
                addAnimation(trackRef)
                trackRef.current.style.transform = `translateX(${-newIndex * (width + mr)}px)`
                setCurrentIndex(newIndex)
            }
    }, [trackRef, lastAllowedIndex, currentIndex])

    // const Children = useMemo(() => <HitsChildren />,[])

    if (items && items.length) return (
        <div className={styles.wrapper}>

            {arrows ? <MemorizedArrows slide={slide}/> : null}

            <div className={styles.container} ref={trackWrapperRef}>
                <div className={styles.track} ref={trackRef}>
                    {!favorites ? items.map(item => (
                        <MemorizedSliderItem item={item} key={item.id} width={width} height={height} isMobile={isMobile} mr={mr} mobH={mobH} borderRadius={borderRadius} imagePercents={imagePercents}>
                            <MemorizedHitsChildren price={item.price} title={item.title}/>
                        </MemorizedSliderItem>
                    ))
                    : items.map(item => (
                            <MemorizedCustomSliderItemWithFavorites item={item} key={item.id} width={width} height={height} isMobile={isMobile} mr={mr} mobH={mobH} borderRadius={borderRadius} imagePercents={imagePercents}>
                                <MemorizedHitsChildren price={item.price} title={item.title}/>
                            </MemorizedCustomSliderItemWithFavorites>
                        ))
                    }
                </div>
            </div>

            {scrollbar ? <CustomScrollbar resizedWidth={resizedWidth} lastAllowedIndex={lastAllowedIndex} currentIndex={currentIndex} width={width} mr={mr} itemsCount={itemsCount}/> : null}
        </div>
    );

    return null
};

export default CustomSlider;




