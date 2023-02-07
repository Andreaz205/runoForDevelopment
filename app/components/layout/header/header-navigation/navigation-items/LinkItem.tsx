import React, {Dispatch, FC, SetStateAction, useEffect, useRef} from 'react';
import Link from "next/link";
import cn from "classnames";
import styles from './LinkItem.module.scss'
import headerBottomData from "../../header-bottom/header-bottom.data";

const LinkItem :FC<{title: string; link: string; activeElement: string, setActiveElement: Dispatch<SetStateAction<string>>}> = ({
    title,
    link,
    activeElement,
    setActiveElement,
    setBottomLinks
}) => {
    const ref = useRef<HTMLDivElement|null>(null )

    const callback = (e: any) => {
        let activeElement = e.target.querySelector('span')
        if (activeElement) {
            setActiveElement(activeElement.innerText)
            let bottomData = headerBottomData.find(item => item.name == activeElement?.innerText)
            setBottomLinks(bottomData?.items)
        }

    }

    useEffect(() => {

        ref.current?.addEventListener('mouseenter', callback)
        ref.current?.addEventListener('mouseout', callback)

        return () => {
            ref.current?.removeEventListener('mouseenter', callback)
            ref.current?.removeEventListener('mouseout', callback)
        }
    }, [])

    return (
        <div style={{height: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center'}} ref={ref}>
            <Link href={link} >
                <span className={cn({[styles.active]: title === activeElement})}>{title}</span>
            </Link>
        </div>

    );
};

export default LinkItem;