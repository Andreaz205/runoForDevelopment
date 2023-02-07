import React, {FC} from 'react';
import {IRoom} from "../../../../pages/rooms";
import RoomItem from "@/ui/RoomItem/RoomItem";
import styles from './Rooms.module.scss'

const Rooms:FC<{rooms: IRoom[]}>= ({rooms}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.roomItems}>
                {rooms && rooms.length && rooms.map(room => (
                    <RoomItem room={room} key={room.id}/>
                ))}
            </div>
        </div>

    );
};

export default Rooms;