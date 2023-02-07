import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './CustomScrollbar.module.scss'

const CustomScrollbar:FC<{resizedWidth: number|undefined, currentIndex: number, lastAllowedIndex: number, width: number, mr: number, itemsCount: number}> = ({resizedWidth, currentIndex, lastAllowedIndex, width, mr, itemsCount}) => {
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const [viewportWidth, setViewportWidth] = useState(0)

    useEffect(() => {
        if (scrollbarRef.current) {
            let newViewportWidth = scrollbarRef.current.getBoundingClientRect()
            setViewportWidth(newViewportWidth.width)
        }
    }, [scrollbarRef.current, resizedWidth])

    useEffect(() => {
        if (viewportWidth && width && barRef.current) {
            let barWidthPercents = 0
            if (lastAllowedIndex !== 0) {
                barWidthPercents = (viewportWidth / (itemsCount * (width + mr))) * 100
            } else {
                barWidthPercents = 100
            }
            barRef.current.style.width = barWidthPercents + '%'
            // Необходимо найти left?
            let lengthWithoutBarInPercents = 0
            let indentInPercents = 0
            if (lastAllowedIndex !== 0) {
                lengthWithoutBarInPercents = 100 - barWidthPercents
            }
            indentInPercents = lengthWithoutBarInPercents / lastAllowedIndex
            let left = indentInPercents * currentIndex

            barRef.current.style.left = left + '%'
        }
    }, [viewportWidth, currentIndex, lastAllowedIndex, width, itemsCount, barRef.current])

    return (
        <div ref={scrollbarRef} className={styles.scrollbar}>
            <div ref={barRef} className={styles.bar}></div>
        </div>
    );
};

export default CustomScrollbar;