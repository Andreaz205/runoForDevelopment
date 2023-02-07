import React, {FC} from 'react';
import Menu from "@/ui/About/Menu";
import BigHeader from "@/ui/Catalog/BigHeader";
import BottomImages from "@/ui/About/BottomImages/BottomImages";
import MaxWidthImage from "@/ui/MaxWidthImage/MaxWidthImage";
import IndustryGallery from "@/ui/IndustryGallery/IndustryGallery";
import styles from './Industry.module.scss'

const Industry :FC= () => {
    return (
        <div>
            <BigHeader title={'Производство Yorcom'} />
            <Menu />
            <MaxWidthImage src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} />
            <div className={styles.paragraph}>
                Мы открыли собственное производство и сотрудничаем с лидерами отрасли, чтобы создавать стильную мебель, которая прослужит долго.
            </div>
            <IndustryGallery />
            <BottomImages />
        </div>
    );
};

export default Industry;