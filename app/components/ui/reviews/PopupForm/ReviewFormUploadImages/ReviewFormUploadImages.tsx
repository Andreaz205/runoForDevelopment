import React, {FC} from 'react';
import styles from './ReviewFormUploadImages.module.scss'
import Image from "next/image";
import {AiOutlineCloseCircle} from "react-icons/ai";

const ReviewFormUploadImages :FC = ({images, deleteImage}) => {
    return (
        <div className={styles.container}>
            {images && images.length ? images.map(image => (
                    <div className={styles.image} key={image.id}>
                        <Image src={image.image_url} alt={image.id} fill/>
                        <button className={styles.deleteButton} onClick={(e) => deleteImage(e, image)}>
                            <AiOutlineCloseCircle />
                        </button>
                    </div>
            )) : null}
        </div>
    );
};

export default ReviewFormUploadImages;