import React, {FC} from 'react';
import styles from './About.module.scss'
import Menu from "@/ui/About/Menu";
import BigHeader from "@/ui/Catalog/BigHeader";
import Image from "next/image";
import Article from "@/ui/About/Article/Article";
import GalleryColumn from "@/ui/About/GalleryColumn/GalleryColumn";
import BottomImages from "@/ui/About/BottomImages/BottomImages";
import CustomSlider from "@/ui/CustomSlider/CustomSlider";
import MaxWidthImage from "@/ui/MaxWidthImage/MaxWidthImage";

const sliderData = [
    {id: 1, image_url: 'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'},
    {id: 2, image_url: 'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'},
    {id: 3, image_url: 'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'},
    {id: 4, image_url: 'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'},
    {id: 5, image_url: 'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'},
    {id: 6, image_url: 'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'},
]

const About:FC = () => {
    return (
        <div>
            <BigHeader title={'О компании'} />
            <Menu />
            <MaxWidthImage src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} />
            <Article />
            <h1>Инетерьер на любой вкус</h1>
            <div className={styles.text}>
                Мы делаем дизайнерскую мебель для реальных квартир. Мы ценим индивидуальный стиль и хотим помочь оформить дом так, чтобы он отражал ваш вкус в интерьере. Наши клиенты — сотни тысяч людей, готовых делиться своими решениями: планировкой, выбранной мебелью, вариантами стилизации. Ищите идеи и создавайте окружающую обстановку, которая будет вдохновлять каждый день!
            </div>
            <CustomSlider items={sliderData} initWidth={400} initHeight={600} borderRadius={0} imagePercents={100} scrollbar/>
            <GalleryColumn />
            <BottomImages />
        </div>

    );
};

export default About;