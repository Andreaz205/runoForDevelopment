import React, {FC} from 'react';
import {IRoom} from "../../../../pages/rooms";
import styles from './RoomItem.module.scss'
import Image from "next/image";
import Link from "next/link";

const RoomItem:FC<{room: IRoom}> = ({room}) => {
    return (
        <div className={styles.room}>
            <div className={styles.inner}>
                <div className={styles.image}>
                    <Link href={`/rooms/${room.id}`}>
                        <Image src={room.image_url || '/GridImages/no-image.webp'} alt='' fill/>
                    </Link>
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>
                        {room.title}
                    </div>
                    <div className={styles.categories}>
                        {room.categories && room.categories.length && room.categories.map(category => (
                            <Link href={`/catalog/category/${category.id}`} key={category.id} className={styles.word}>{category.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomItem;