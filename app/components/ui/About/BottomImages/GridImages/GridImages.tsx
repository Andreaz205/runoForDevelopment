import React, {FC} from 'react';
import styles from './GridImages.module.scss'
import Image from "next/image";
import Map from "@/ui/Map/Map";

const GridImages:FC= () => {
    return (
        <div className={styles.container}>
            <div className={styles.images}>
                <div className={styles.firstArea}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}  alt='' fill/>
                </div>
                <div className={styles.secondArea}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}  alt='' fill/>
                </div>
                <div className={styles.thirdArea}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt=''  fill/>
                </div>
                <div className={styles.fourthArea}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}  alt='' fill/>
                </div>
            </div>
            <Map />
        </div>
    );
};

export default GridImages;