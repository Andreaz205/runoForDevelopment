import React, {useEffect, useRef, useState} from 'react';
import Slider from "@/ui/slider/Slider";
import styles from "@/ui/slider/Slider.module.scss";
import SliderArrows from "@/ui/slider/SliderArrows/SliderArrows";
import SliderItem from "@/ui/slider/SliderItems/SliderItem";
import Scrollbar from "@/ui/slider/Scrollbar/Scrollbar";
import {useRouter} from "next/router";
import {getTransformValue} from "@/utils/getTransformValue";
import CategoryItem from "@/ui/slider/SliderItems/CategoryItem/CategoryItem";
import headStyles from './PopularCategoriesSlider.module.scss'

const PopularCategoriesSlider = ({items}) => {

    const sliderTrackRef = useRef<null|HTMLDivElement>(null)
    
    const slider = useRef<null|HTMLDivElement>(null)
    const [clicked, setClicked] = useState(false)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [delta, setDelta] = useState(0)
    // обычный тег a не работает из за поинтер events
    const [timer, setTimer] = useState()

    const {push} = useRouter()

    const slideWidth = 420
    const slidesCount = items.length

    let translate = (index: number, width: number) => {
        sliderTrackRef.current.style.cssText = `transition: .3s ease;transform: translateX(-${index * width}px)`
    }

    const slideLeft = () => {
        setCurrentSlideIndex((currentSlideIndex - 1) >= 0 ? currentSlideIndex - 1 : 0)
        translate(currentSlideIndex - 1, slideWidth+20)
    }

    let lastAllowedIndex = (sliderTrackRef, slideWidth) => {

        let viewportWidth = sliderTrackRef.current?.offsetWidth
        if (slidesCount * (slideWidth + 20) < viewportWidth) {
            return 0
        }
        let allowedCount = Math.trunc(viewportWidth/(slideWidth+10+10))

        if (allowedCount === 0) allowedCount = 1

        let lastAllowedIndex = slidesCount - allowedCount
        return lastAllowedIndex
    }

    const slideRight = () => {
        let lastIndex = lastAllowedIndex(sliderTrackRef, slideWidth)
        if (currentSlideIndex === lastIndex) return
        setCurrentSlideIndex(currentSlideIndex + 1)
        translate(currentSlideIndex + 1, slideWidth + 20)
    }

    const align = (currentSlideIndex: number, delta) => {
        let threshold = (slideWidth+10+10) * 0.2

        if (delta < -10) {
            setCurrentSlideIndex(currentSlideIndex - 1)
            translate(currentSlideIndex, slideWidth+10+10)
        }
        else if (delta > threshold) {
            if (currentSlideIndex === lastAllowedIndex(sliderTrackRef, slideWidth)) {
                translate(currentSlideIndex, slideWidth+10+10)
            } else {
                setCurrentSlideIndex(currentSlideIndex + 1)
                translate(currentSlideIndex + 1, slideWidth+10+10)
            }
        } else {
            translate(currentSlideIndex, slideWidth+10+10)
        }
    }


    const swipeStart = (e: any) => {

        setClicked(true)
        let id = e.target.id
        if (id) {
            let newTimer = setTimeout(() => {
                push(`/catalog/category/${id}`)
            }, 10)
            setTimer(newTimer)
        }

        slider.current.posInit = e.clientX
        slider.current.transform = getTransformValue(sliderTrackRef.current)
    }

    const swipeAction = (e: any) => {
        if (timer) clearTimeout(timer)
        if (clicked) {

            let transform = e.currentTarget.transform
            let posInit = e.currentTarget.posInit
            let currentTransform = getTransformValue(sliderTrackRef.current)
            let currentDelta = transform - currentTransform
            setDelta(currentDelta)
            setCurrentSlideIndex(Math.trunc(
                currentTransform/(slideWidth + 20)) <= 0
                ? Math.trunc(Math.abs(currentTransform/(slideWidth+10+10))) <= lastAllowedIndex(sliderTrackRef, slideWidth)
                    ? Math.trunc(Math.abs(currentTransform/(slideWidth+10+10)))
                    : lastAllowedIndex(sliderTrackRef, slideWidth) - 1
                : 0
            )

            sliderTrackRef.current.style.cssText = `transform: translateX(${transform - posInit + e.clientX}px)`

        }

    }

    const swipeEnd = () => {
        setClicked(false)
        if (delta < 0) {
            setDelta(0)
            align( currentSlideIndex, 0)
        } else {
            align(currentSlideIndex, delta)
            setDelta(0)
        }

    }

    useEffect(() => {
        slider.current?.addEventListener('mousemove', swipeAction)
        slider.current?.addEventListener('touchmove', swipeAction)
        slider.current?.addEventListener('mouseup', swipeEnd)
        slider.current?.addEventListener('touchend', swipeEnd)

        slider.current?.addEventListener('mousedown', swipeStart)
        slider.current?.addEventListener('touchstart', swipeStart)
        slider.current?.addEventListener('mouseleave', swipeEnd)
        slider.current?.addEventListener('touchcancel', swipeEnd)
        return () => {
            slider.current?.removeEventListener('mousedown', swipeStart)
            slider.current?.removeEventListener('touchstart', swipeStart)
            slider.current?.removeEventListener('mouseleave', swipeEnd)
            slider.current?.removeEventListener('touchcancel', swipeEnd)

            slider.current?.removeEventListener('mousemove', swipeAction)
            slider.current?.removeEventListener('touchmove', swipeAction)
            slider.current?.removeEventListener('mouseup', swipeEnd)
            slider.current?.removeEventListener('touchend', swipeEnd)
        }
    }, [swipeStart, swipeAction, swipeEnd])

    return (
        <>
                <div className={headStyles.wrapper}>
                    <div className={headStyles.head}>Популярные категории</div>
                </div>
                <div className={styles.sliderWrapper}>
                    <SliderArrows slideLeft={slideLeft} slideRight={slideRight}/>
                    <div className={styles.sliderList} ref={slider}>
                        <div className={styles.sliderItems} ref={sliderTrackRef}>
                            {items && items.map(item => (
                                <CategoryItem key={item.id} item={item}/>
                            ))}
                        </div>
                    </div>
                    {/*<CustomScrollbar slidesCount={slidesCount} slideWidth={slideWidth} sliderTrackRef={sliderTrackRef} currentSlideIndex={currentSlideIndex}/>*/}
                </div>

        </>


    );
};

export default PopularCategoriesSlider;