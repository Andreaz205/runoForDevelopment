import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Scrollbar.module.scss'
import useWindowSize from "@/hooks/useWindowSize";
import {useRouter} from "next/router";
import cn from "classnames";

const Scrollbar :FC= ({
    currentSlideIndex,
    slidesCount,
    slideWidth,
}) => {
    const scrollbarRef = useRef<null | HTMLDivElement>(null)
    const sliderRef = useRef<null | HTMLDivElement>(null)

    const [sliderLength, setSliderLength] = useState(0)
    const [minIndent, setMinIndent] = useState(0)
    const [lastIndex, setLastIndex] = useState(0)
    const [allowedSlidesCount, setAllowedSlidesCount] = useState(0)
    const [viewportWidth, setViewportWidth] = useState(0)

    const {asPath} = useRouter()
    const size = useWindowSize()

    useEffect(() => {
        setAllowedSlidesCount(Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)))
        if (allowedSlidesCount === 0) setAllowedSlidesCount(1)
        setViewportWidth(scrollbarRef.current?.offsetWidth)
        setSliderLength(allowedSlidesCount/slidesCount * viewportWidth)
        setLastIndex(slidesCount - allowedSlidesCount)
        setMinIndent((viewportWidth - sliderLength)/lastIndex)
        if (slidesCount * (slideWidth + 20) < scrollbarRef.current?.offsetWidth) {
            setSliderLength(scrollbarRef.current?.offsetWidth)
        } else {
            setSliderLength((Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) !== 0 ? Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) : 1)/slidesCount * (scrollbarRef.current?.offsetWidth))
        }
    }, [size, asPath])

    useEffect(() => {
        setAllowedSlidesCount(Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) !== 0 ? Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) : 1)
        setViewportWidth(scrollbarRef.current?.offsetWidth)
        if (slidesCount * (slideWidth + 20) < scrollbarRef.current?.offsetWidth) {
            setSliderLength(scrollbarRef.current?.offsetWidth)
        } else {
            setSliderLength((Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) !== 0 ? Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) : 1)/slidesCount * (scrollbarRef.current?.offsetWidth))
        }

        setLastIndex(slidesCount - (Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) !== 0 ? Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) : 1))
        setMinIndent(((scrollbarRef.current?.offsetWidth) - ((Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) !== 0 ? Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) : 1)/slidesCount * (scrollbarRef.current?.offsetWidth)))/(slidesCount - (Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) !== 0 ? Math.trunc(scrollbarRef.current.offsetWidth / (slideWidth+10+10)) : 1)))
    }, [])

    useEffect(() => {
        let leftIndent = currentSlideIndex * minIndent
        sliderRef.current.style.cssText = `transition: .3s ease-in-out; height: 1px; width: ${sliderLength}px; background-color: #404040; z-index: 1; left: ${leftIndent}px; border-radius: 5px; position: absolute; top: -1;`
    }, [viewportWidth, allowedSlidesCount, minIndent, sliderLength])

    useEffect(() => {
        let leftIndent = currentSlideIndex * minIndent
        sliderRef.current.style.cssText = `transition: .3s ease-in-out; height: 1px; width: ${sliderLength}px; background-color: #404040; z-index: 1; left: ${leftIndent}px; border-radius: 5px; position: absolute;  top: -1;`
    }, [currentSlideIndex, minIndent])

    return (
        <div className={cn(styles.scrollbar, {[styles.visible]: sliderLength === scrollbarRef.current?.offsetWidth})} ref={scrollbarRef}>
            <div ref={sliderRef}></div>
        </div>
    );
};

export default Scrollbar;
