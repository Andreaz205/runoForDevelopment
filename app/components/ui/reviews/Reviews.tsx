import React, {FC, useMemo, useState} from 'react';
import {IReview} from "@/ui/reviews/reviews.interface";
import styles from './Reviews.module.scss'
import PopupForm from "@/ui/reviews/PopupForm/PopupForm";
import ReviewSlider from "@/ui/reviews/review-slider/ReviewSlider";
import {useRouter} from "next/router";
import ReviewComment from "@/ui/reviews/ReviewComment/ReviewComment";
import {parseToDate} from "@/utils/parseToDate";
import CustomSlider from "@/ui/CustomSlider/CustomSlider";


const Reviews :FC<{initialReviews: IReview[]}> = ({initialReviews, variant}) => {
    const [reviews, setReviews] = useState(initialReviews)
    const [isOpen, setIsOpen] = useState(false)
    const [reviewImages, setReviewImages] = useState(variant.reviewsImages)

    const onBtnClick = (e: any) => {
        e.stopPropagation()
        setIsOpen(true)
    }

    const {asPath, query} = useRouter()

    // const revImages = useMemo(() => {
    //     let imgs = []
    //     if (reviews && reviews.length) reviews.map(review => {
    //         review.created = parseToDate(review.created_at)
    //         if (review.GridImages && review.GridImages.length) {
    //             review.GridImages.map(img => imgs.push({
    //                 id: img.id,
    //                 link: '',
    //                 imagePath: img.image_url,
    //             }))
    //             setReviewImages(imgs)
    //         }
    //     })
    //     return imgs
    // }, [asPath, query])

    return (
        <div className={styles.mainReviewWrapper}>
            <div className={styles.head}>Отзывы</div>
            <PopupForm setIsOpen={setIsOpen} isOpen={isOpen} variant={variant} setReviews={setReviews} reviews={reviews} />
            <div className={styles.wrapper}>
                <div className={styles.container}>

                    {variant.reviewsImages && variant.reviewsImages.length
                        ? <CustomSlider items={variant.reviewsImages} borderRadius={0} imagePercents={100}/>
                        : null
                    }

                    <div className={styles.addReviewButton}>
                        <button
                            onClick={(e) => onBtnClick(e)}
                        >
                            <span>
                              Оставить отзыв
                            </span>
                        </button>
                    </div>

                    {initialReviews && initialReviews.length
                        ? initialReviews.map(review => (
                            <ReviewComment review={review} key={review.id}/>
                        ))
                        : null
                    }
                </div>
            </div>
        </div>

    );
};

export default Reviews;