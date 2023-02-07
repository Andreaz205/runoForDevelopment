import React, {FC} from 'react';
import styles from './IndustryGallery.module.scss'
import ImageBlock from "@/ui/IndustryGallery/ImageBlock/ImageBlock";

const IndustryGallery:FC= () => {
    return (
        <div className={styles.wrapper}>
            <ImageBlock direction={'left'} src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}>
                <h1>Header</h1>
                <div className={styles.content}>
                    A row is created for every separate string listed, and a column is created for each cell in the string. Multiple cell tokens with the same name within and between rows create a single named grid area that spans the corresponding grid cells. Unless those cells form a rectangle, the declaration is invalid.
                </div>
            </ImageBlock>
            <ImageBlock direction={'right'} src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}>
                <h1>Header</h1>
                <div className={styles.content}>
                    A row is created for every separate string listed, and a column is created for each cell in the string. Multiple cell tokens with the same name within and between rows create a single named grid area that spans the corresponding grid cells. Unless those cells form a rectangle, the declaration is invalid.
                </div>
            </ImageBlock>
            <ImageBlock direction={'left'} src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}>
                <h1>Header</h1>
                <div className={styles.content}>
                    A row is created for every separate string listed, and a column is created for each cell in the string. Multiple cell tokens with the same name within and between rows create a single named grid area that spans the corresponding grid cells. Unless those cells form a rectangle, the declaration is invalid.
                </div>
            </ImageBlock>
            <ImageBlock direction={'right'} src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}>
                <h1>Header</h1>
                <div className={styles.content}>
                    A row is created for every separate string listed, and a column is created for each cell in the string. Multiple cell tokens with the same name within and between rows create a single named grid area that spans the corresponding grid cells. Unless those cells form a rectangle, the declaration is invalid.
                </div>
            </ImageBlock>
        </div>
    );
};

export default IndustryGallery;

// Некоторый контент некоторый контент контент некоторый контент контент некоторый контент контент некоторый контент контент некоторый контент