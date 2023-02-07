import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './ImageBlock.module.scss'
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import {current} from "immer";

const ImageBlock :FC<{direction: 'right'| 'left', "src": string, children: React.ReactNode}> = ({
      direction,
      src,
        children
}) => {
    const [initWidth, setInitWidth] = useState(0)
    const blockRef = useRef<HTMLDivElement>(null)
    const {width} = useWindowSize()
    useEffect(() => {
        if (blockRef.current) {
            setInitWidth(blockRef.current.offsetWidth)
        }
    }, [blockRef.current])
    useEffect(() => {
        if (width) {
            setInitWidth(width)
        }
    }, [width])
    console.log(width)
    return (
        <div className={styles.block} ref={blockRef} >
            {direction === 'left' ||  initWidth < 600 ? (
                <div className={styles.container}>
                    <div className={styles.image}>
                        <Image src={src} alt={''} fill/>
                    </div>
                    <div className={styles.text}>
                        {children}
                    </div>
                </div>
            ) :  (
                <div className={styles.container}>
                    <div className={styles.text}>
                        {children}
                    </div>
                    <div className={styles.image}>
                        <Image src={src} alt={''} fill/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageBlock;