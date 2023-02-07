import React, {FC, useEffect, useRef} from 'react';
import styles from './Area.module.scss'
import cn from "classnames";

const Area:FC<{catalogItemId: number, hoveredId: number, activeId: number, width?: number, setActiveId: (id: number) => void, elementId: number}> = ({catalogItemId, hoveredId, width, setActiveId, elementId, activeId, images}) => {

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current) {
            ref.current.style.cssText = `width: ${width}%; height: 100%; border: 1px; display: inline-block; white-space: nowrap;`
            ref.current?.addEventListener('mouseover', mouseOverCallback)
            ref.current?.addEventListener('mouseleave', mouseLeaveCallback)
        }
        return () => {
            ref.current?.removeEventListener('mouseover', mouseOverCallback)
            ref.current?.removeEventListener('mouseleave', mouseLeaveCallback)
        }
    }, [ref, width])

    const mouseLeaveCallback = () => {
        setActiveId(images[0].id)
    }

    const mouseOverCallback = () => {
        setActiveId(elementId)
    }

    return (
        <div ref={ref} className={styles.area}>
            <div className={cn({[styles.active]: activeId === elementId && hoveredId === catalogItemId}, {[styles.decoration]: hoveredId === catalogItemId && images?.length > 1})}></div>
        </div>
    );
};

export default Area;