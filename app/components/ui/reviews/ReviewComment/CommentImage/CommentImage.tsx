import React, {FC} from 'react';
import {IReviewImage} from "@/ui/reviews/reviews.interface";
import styles from './CommentImage.module.scss'
import Image from "next/image";

const CommentImage :FC <{image: IReviewImage}>= ({image}) => {
    return (
        <div className={styles.image}>
            <Image src={image.image_url} alt="" fill/>
        </div>
    );
};

export default CommentImage;