import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Product.module.scss'
import RatingStars from "@/ui/rating-stars/RatingStars";
import Delivery from "@/ui/delivery/Delivery";
import Link from "next/link";
import Characteristics from "@/ui/Characteristics/Characteristics";
import VariantGallery from "@/ui/galleries/VariantGallery/VariantGallery";
import Image from "next/image";
import RelatedVariants from "@/ui/RelatedVariants/RelatedVariants";
import {useActions} from "@/hooks/useActions";
import Reviews from "@/ui/reviews/Reviews";
import Meta from '@/utils/meta/Meta';


const Product:FC = ({data}) => {
    // const {query, isFallback} = useRouter()
    // if (isFallback) {
    //     return <div>LOADING...</div>
    // }

    const [isLoading, setIsLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const reviewsRef = useRef<HTMLDivElement>(null)
    const richRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (richRef.current && data.rich_content) {
            richRef.current.innerHTML = data.rich_content.html
        }
    }, [richRef])

    const {addItemToCart} = useActions()

    const scrollIntoReviews = () => {
        if (reviewsRef.current) {
            reviewsRef.current.scrollIntoView({behavior: 'smooth', block: "center"})
        }
    }

    const addToCart = (item) => {
        let cart = localStorage.getItem('cart')
        let c
        if (cart) {
             c = JSON.parse(cart)
        }  else {
             c = null
        }
        if (c && c.length && c.length > 0) {
            let existItem = c.find(el => el.id == item.id)
            if (existItem) {
                c = c.filter(el => el.id !== existItem.id)
                existItem.count++
                let newData = [...c, existItem]
                localStorage.setItem('cart', JSON.stringify(newData))
            } else {
                let newItem = {...item, count: 1}
                let newData = [...c, newItem]
                localStorage.setItem('cart', JSON.stringify(newData))
            }
        } else {
            let newItem = {...item, count: 1}
            localStorage.setItem('cart', JSON.stringify([newItem]))
        }

        addItemToCart(item)
    }

    return (
        <>
            <Meta
                title={data.product.title}
                description='Лучшие диваны в Челябинске'
            >
                <div className={styles.wrapper}>
                {isLoading ? <div>Loading...</div> : null}
                <div className={styles.categories}>
                    {categoryData
                        ? categoryData.reverse().map(el => (
                            <a href='#' key={el.id}>{el.name} / </a>
                        ))
                        : null}
                    {categoryData.length > 0 && <span>{data.title}</span>}
                </div>

                <div className={styles.content}>
                    <div className={styles.gallery}>
                        <VariantGallery images={data.images}/>
                        {/*<VariantPageGallery GridImages={data?.GridImages}/>*/}
                        <div ref={richRef}></div>
                    </div>
                    <div className={styles.sticky}>
                        <div className={styles.textBlock}>
                            <span className={styles.title}>{data.product.title}</span>
                            {/*<span>{data?.product?.clarification} {data.product.title} </span>*/}
                            <div className={styles.titleValues}>
                                {data?.optionNames?.map(name =>
                                    name.values.map(value => (
                                        // value.active && <span>{value.title} {(data.optionNames.length - 1) === data.optionNames.indexOf(name) ? null : <span>/</span>}</span>
                                        value.active && <span key={value.id}>{value.title} </span>
                                    ))
                                )}
                            </div>
                            <div className={styles.reviewsBlock}>
                                <RatingStars rating={data.rating} />
                                <div className={styles.reviews} onClick={() => scrollIntoReviews()}>
                                    {data?.reviews?.length ?? 0} отзывов
                                </div>
                            </div>

                            <div className={styles.priceBlock}>
                                <div className={styles.price}>{data.price} ₽</div>
                                {data.oldPrice && data.sale && (
                                    <div className={styles.oldPrice}>{data.oldPrice}</div>
                                )}
                                {data.oldPrice && data.sale && (
                                    <div className={styles.sale}>{data.sale}</div>
                                )}
                            </div>

                            <div className={styles.optionsBlock}>
                                {data?.optionNames?.map(el => (
                                    <div key={el.id} className={styles.option}>
                                        <div className={styles.nameTitle}>{el.title}:</div>
                                        <div className={styles.optionValues}>
                                            {el.values && el.values.length
                                                ? el.values.map(value => (
                                                    value.image_url
                                                        ? value.active === true
                                                            ? <div key={value.id} className={styles.valueActiveImage}>
                                                                <Image src={`http://localhost:8000/storage/${value.image_url}`} alt='' fill title={value.title}/>
                                                            </div>
                                                            : <div key={value.id} className={styles.valueImage}>
                                                                <Link href={`/products/${value?.linkedVariantId}`}>
                                                                    <Image src={`http://localhost:8000/storage/${value.image_url}`} alt="" fill title={value.title}/>
                                                                </Link>
                                                            </div>
                                                        : value.active === true
                                                            ? <div key={value.id} className={styles.activeValue}>
                                                                {value.title}
                                                            </div>
                                                            : <div key={value.id} className={styles.value}>
                                                                <Link href={`/products/${value?.linkedVariantId}`}>
                                                                    {value.title}
                                                                </Link>
                                                            </div>
                                                ))
                                                : <div style={{border: '1px solid red'}}>{el.default_option_value.title}</div>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Delivery />
                            <div className={styles.cartButton}>
                                <button className={styles.btn} onClick={() => addToCart(data)}>
                                    <span>В корзину</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Characteristics />
                <RelatedVariants related={data?.related}/>
                <Reviews initialReviews={data?.reviews} variant={data} />
                <div ref={reviewsRef}></div>
            </div>
            </Meta>
        </>

    );
};

export default Product;