import React from 'react';
import styles from './FavoriteElement.module.scss'
import Image from "next/image";
import Price from "@/ui/Price/Price";
import {FaTrashAlt} from "react-icons/fa";
import Link from "next/link";
import {useActions} from "@/hooks/useActions";

const FavoriteElement = ({item}) => {
    const {deleteItemFromFavorite} = useActions()

    return (
        <div className={styles.container}>
            <div className={styles.deleteButton} onClick={() => deleteItemFromFavorite(item)}>
                <FaTrashAlt />
            </div>
            <div className={styles.image}>
                <Link href={item.link}>
                    <Image src={item.image_url} alt={item.title} fill/>
                </Link>
            </div>
            <div className={styles.bottom}>
                <div className={styles.title}>{item.title}</div>
                <Price price={item.price} />
            </div>
        </div>
    );
};

export default FavoriteElement;