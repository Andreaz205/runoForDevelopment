import React, {FC, useEffect, useRef} from 'react';
import {INavItem} from "../header-navigation/navigation-items/nav-item.interface";
import Link from "next/link";
import styles from './HeaderBottom.module.scss'


const BottomLinkItem:FC<INavItem> = ({
    title,
    link
 }) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const enterCallback = (e: any) => {
        let activeElement = e.target.querySelector('a')

    }

    const leaveCallback = (e: any) => {
        console.log(e.target)
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
        <div ref={ref} className={styles.link}>
            <Link href={link}>
                {title}
            </Link>
        </div>
    );
};

export default BottomLinkItem;