import React, {FC} from 'react';
import styles from './BottomImages.module.scss'
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import {useRouter} from "next/router";
import GridImages from "@/ui/About/BottomImages/GridImages/GridImages";

const BottomImages:FC= () => {

    const {asPath} = useRouter()
    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <Link href="/site/about" className={cn({[styles.notActive]: asPath !== '/site/about'}, {[styles.active]: asPath === '/site/about'})}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt='' fill/>
                </Link>
                <div className={styles.content}>
                    <h1>Наша компания</h1>
                    <div>
                        Наши фабрики сегодня — это 1000 специалистов, 22 000 кв. метров площади, высокотехнологичное оборудование и контроль качества на каждом этапе.
                    </div>
                </div>
            </div>
            <div className={styles.item}>
                <Link href="/site/industry" className={cn({[styles.notActive]: asPath !== '/site/industry'}, {[styles.active]: asPath === '/site/industry'})}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt='' fill/>
                </Link>
                <div className={styles.content}>
                    <h1>Производство</h1>
                    <div>
                    От обивки и фурнитуры до незначительных деталей конструктива — мы тщательно отбираем материалы и комплектующие для производства.
                    </div>
                </div>
            </div>
            <div className={styles.item}>
                <Link href="/site/materials" className={cn({[styles.notActive]: asPath !== '/site/materials'}, {[styles.active]: asPath === '/site/materials'})}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt='' fill/>
                </Link>
                <div className={styles.content}>
                    <h1>Ткани</h1>
                    <div>
                        Ориентация на мировые тренды мебельной моды позволила нам попасть на страницы профильных изданий: AD, ELLE Decoration, Houzz, The Village.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomImages;