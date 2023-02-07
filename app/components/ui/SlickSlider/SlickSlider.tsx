import React, {FC} from 'react';
import Slider from "react-slick";
import styles from './SlickSlider.module.scss'
import Image from "next/image";

let items = [
    {id: 0, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 1, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 2, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 3, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 4, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 5, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 6, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 7, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 8, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 9, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
]

const SlickSlider :FC= ({items}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };
    return (

            <div>
                <Slider {...settings}>
                    {items.map(item => (
                        <div className={styles.item}>
                            <Image src={item.image_url} alt='' fill/>
                        </div>
                    ))}
                </Slider>
            </div>
    );
};

export default SlickSlider;