import React, {FC, useMemo} from 'react';
import styles from './ReviewComment.module.scss'
import {IReview} from "@/ui/reviews/reviews.interface";
import {AiFillStar} from "react-icons/ai";
import CommentImage from "@/ui/reviews/ReviewComment/CommentImage/CommentImage";

type starType = {
    id: number
}

const ReviewComment:FC<{review: IReview}> = ({review}) => {

    const stars = useMemo(() => {
        let resultStars: starType[] = []
        for (let i = 1; i <= review.mark; i++) {
            if (i > 5) return
            resultStars.push({id: i})
        }
        return resultStars
    }, [review.mark])

    return (
        <div className={styles.comment}>
            <div className={styles.userInfo}>
                {review.name}
            </div>
            <div className={styles.content}>
                <div>{review.content}</div>
                {
                    review.images ? (
                        <div className={styles.commentImages}>
                            {
                                review.images.map(el => (
                                    <CommentImage image={el} key={el.id}/>
                                ))
                            }
                        </div>
                    )
                        : null
                }
            </div>
            <div className={styles.dateMark}>
                <div className={styles.date}>{review.created}</div>
                <div className={styles.stars}>
                    {stars.length
                        ? stars.map(star => (
                            <div className={styles.star} key={star.id}>
                                <AiFillStar />
                            </div>
                            ))
                        : null
                }
                </div>
            </div>
        </div>
    );
};

export default ReviewComment;