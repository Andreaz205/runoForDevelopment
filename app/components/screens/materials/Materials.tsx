import React, {FC} from 'react';
import Menu from "@/ui/About/Menu";
import BigHeader from "@/ui/Catalog/BigHeader";
import BottomImages from "@/ui/About/BottomImages/BottomImages";
import MaxWidthImage from "@/ui/MaxWidthImage/MaxWidthImage";
import MaterialsGallery from "@/ui/MaterialsGallery/MaterialsGallery";

const Materials:FC = () => {
    return (
        <div>
            <BigHeader title={'Ткани'} />
            <Menu />
            <MaxWidthImage src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} />
            <MaterialsGallery />
            <BottomImages />
        </div>
    );
};

export default Materials;