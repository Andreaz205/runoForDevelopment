import React, {FC} from 'react';
import Banner from "../../ui/banner/Banner";
import Meta from "@/utils/meta/Meta";
import {ISliderItems} from "../../../../pages";
import styles from './Home.module.scss'
import YandexMap from "@/ui/Map/Map";
import CustomSlider from "@/ui/CustomSlider/CustomSlider";

let items1 = [
    {id: 0, image_url: 'http://localhost:8000/storage/images/oe0UsXDGPAQ0HTT0luEUH4St7maVtCDGzc04sEZO.jpg'},
    {id: 1, image_url: 'http://localhost:8000/storage/images/YNX9NscaLuYtsB2U43YLDAYuqalL0wLQt4RFE7Oc.jpg'},
    {id: 2, image_url: 'http://localhost:8000/storage/images/yFRvvKqRUzXQhQtjnPAGnMNXjH1HFiOKPxy2Xjpz.jpg'},
    {id: 3, image_url: 'http://localhost:8000/storage/images/xEPtzAJveH3DlLJMCL95xqdkeHGWYobrLjxL14q1.jpg'},
    {id: 4, image_url: 'http://localhost:8000/storage/images/WjaBjrwIeb5QCeyDsDpz2GFPY0KHBGs6ygvqFrxv.jpg'},
    {id: 5, image_url: 'http://localhost:8000/storage/images/WCcftnwxoPD93duiw44q6hCxvX2urkEm1JzUkFKv.jpg'},
    {id: 6, image_url: 'http://localhost:8000/storage/images/vWYlxNeqndysfLi6jnx0wxu7c2ICoIzG1TtyixSh.jpg'},
    {id: 7, image_url: 'http://localhost:8000/storage/images/vHKS97KiddKCpLqry7QlcdpePNSfnzlHYIZppeQP.jpg'},
    {id: 8, image_url: 'http://localhost:8000/storage/images/V6CPgFqWlhKgkZbGEFPIA6lJKw6Wiv8V3UXq1by8.jpg'},
    {id: 9, image_url: 'http://localhost:8000/storage/images/Uj53NZE5kC2dhSRHdvpinfE87VUTD15WChr7iwXA.jpg'},
]

let bannerImages = [
    {
       id: 0
    },
    {
        id: 1
    },
    {
        id: 2
    },
]


const Home :FC<{hits: ISliderItems[]}> = ({hits, popularCategoryItems, salesItems}) => {

    return (
        <div>

            <Meta
                title='Главная'
                description='Лучшие диваны в Челябинске'
            >
                <Banner bannerImages={bannerImages}/>
                <div className={styles.hitsSliderHead}>
                    <div className={styles.header}>Хиты продаж</div>
                    <div className={styles.content}>
                        Отобранные модели хит продаж по всей России.
                        Каждая модель дивана тщательно отбиралась среди покупателей.
                        YORCOM - это воплощение стильного дизайна и приятной цены.
                    </div>
                </div>

                <CustomSlider items={hits} arrows scrollbar favorites={true} >

                </CustomSlider>

                <div className={styles.popularTitle}>
                    Популярные категории
                </div>
                <CustomSlider items={popularCategoryItems}/>

                <div className={styles.salesTitle}>
                    Акции
                </div>
                <CustomSlider items={salesItems} scrollbar borderRadius={0} imagePercents={100} initHeight={500}/>
                <YandexMap />
            </Meta>
        </div>
    );
};

export default Home;