import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './Banner.module.scss'
import {IoChevronBack, IoChevronForward} from "react-icons/io5";
import useWindowSize from "@/hooks/useWindowSize";
import image from '/public/images/img_divanru.jpg'
import Crumbs from "@/ui/banner/crumbs/Crumbs";



const Banner :FC = ({bannerImages}) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [x, setX] = useState<number>(0)
    const [width, setWidth] = useState<number>(0)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const size = useWindowSize();

    let itemsAmount = 3

    const slideTo = (index: number, width: number) => {
        ref.current!.style.cssText = `transform: translateX(${-(index * width)}px)`
    }

    useEffect(() => {
        if (size.width > 1920) size.width = 1920
        setX(0)
        setWidth(size.width)
        initBanner()
        initWidth([...ref.current.children])

    }, [size, ref, width])

    const initBanner = () => {
        ref.current.style.cssText = `transform: translateX(-${currentIndex * width}px)`
    }

    const initWidth = (elements: HTMLDivElement[]) => {
        elements.forEach(el => {
            el.style.cssText = `height: 100%; display: inline-block; background-color: #f1f1f1; width: ${width}px;`
        })
    }

    const slideLeft = () => {
        if (currentIndex !== 0) setCurrentIndex(currentIndex - 1)
        if (x == 0) return
        ref.current!.style.cssText = `transform: translateX(${x + width}px)`
        setX(x + width)
    }

    const slideRight = () => {
        if (currentIndex !== (itemsAmount - 1)) setCurrentIndex(currentIndex + 1)
        if (x == -width*2) return
        ref.current!.style.cssText = `transform: translateX(${x - width}px)`
        setX(x - width)
    }

    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.banner}>

                <div className={styles.list} ref={ref}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={image.src}
                            alt="Image"
                        />
                    </div>
                    <div className={styles.imageWrapper}>
                        <img
                            src={image.src}
                            alt="Image"
                        />
                    </div>
                    <div className={styles.imageWrapper}>
                        <img
                            src={image.src}
                            alt="Image"
                        />
                    </div>
                </div>


                <div className={styles.controls}>
                    <div className={styles.arrowsBlock}>
                        <button className={styles.arrow} onClick={() => slideLeft()}>
                            <IoChevronBack />
                        </button>

                        {/*<div className={styles.description}>*/}
                        {/*    Описание*/}
                        {/*</div>*/}

                        <button className={styles.arrow} onClick={() => slideRight()}>
                            <IoChevronForward />
                        </button>
                    </div>
                </div>
            </div>
            <Crumbs slideTo={slideTo} activeIndex={currentIndex} bannerImages={bannerImages} width={width} setCurrentIndex={setCurrentIndex} setX={setX}/>
        </div>


    );
};

export default Banner;