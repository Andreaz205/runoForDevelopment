import React, {FC, useState} from 'react';
import styles from './Map.module.scss'

import {YMaps, Map, ZoomControl, FullscreenControl, Placemark} from "react-yandex-maps";
import {RiCloseLine} from "react-icons/ri";
import {CSSTransition} from "react-transition-group";

const YandexMap :FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    return (
        <div className={styles.container}>
                <CSSTransition in={isOpen} timeout={100} unmountOnExit classNames='alert'>
                    <div className={styles.info}>
                        <div className={styles.content}>
                            <div className={styles.closeButton} onClick={() => setIsOpen(false)}>
                                <RiCloseLine />
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            <YMaps>

                <Map defaultState={{ center: [55.160579, 61.400936], zoom: 13, controls: [], behaviors: ["drag"]}} className={styles.map} >
                    <Placemark geometry={[55.160264, 61.513374]} />
                    <ZoomControl options={{ float: "right" }} className={styles.controls}/>
                    <FullscreenControl className={styles.controls}/>
                </Map>
            </YMaps>
        </div>
    );
};

export default YandexMap;