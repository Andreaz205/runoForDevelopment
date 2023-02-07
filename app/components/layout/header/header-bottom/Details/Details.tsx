import React, {FC, useEffect, useRef, useState} from 'react';
import styless from './Details.module.scss'
import styles from '../HeaderBottom.module.scss'
import cn from 'classnames'

const Details :FC = ({isOpenDetails, setActiveElement, setIsOpenDetails, setDefaultBottomLinks}) => {

    const ref = useRef<HTMLDivElement | null>(null)

    const enterCallback = (e: any) => {

    }

    const leaveCallback = (e: any) => {
        if (e.relatedTarget?.id !== 'header-bottom') {
            setIsOpenDetails(false)
            setDefaultBottomLinks()
        }
    }

    useEffect(() => {
        ref?.current?.addEventListener('mouseenter', enterCallback)
        ref?.current?.addEventListener('mouseleave', leaveCallback)

        return () => {
            ref?.current?.removeEventListener('mouseenter', enterCallback)
            ref?.current?.removeEventListener('mouseleave', leaveCallback)
        }
    }, [])

    return (
        <>
            <div className={cn(styles.details, {[styles.visible]: isOpenDetails} )} ref={ref} id='details'>

                <div className={styles.detailsBlock}>

                    Details
                </div>
            </div>
            <div className={cn(styless.grey, {[styless.visible]: isOpenDetails})}></div>
        </>

    );
};

export default Details;