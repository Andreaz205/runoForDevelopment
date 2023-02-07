import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import styles from './CityPopup.module.scss'
import {useMutation} from "react-query";
import {SessionService} from "@/services/SessionService";
import {VscChromeClose} from "react-icons/vsc";
import {useActions} from "@/hooks/useActions";


const CityPopup:FC<{setIsOpenCityPopup: Dispatch<SetStateAction<boolean>>}>= () => {
    const [city, setCity] = useState('')
    const popupRef = useRef<HTMLDivElement>(null)
    const {closeCityPopup, setStateCity} = useActions()
    const {mutateAsync} = useMutation(
        'store city',
        (city) => SessionService.setCity(city),
        {
            onSuccess: ({data}) => {
                setStateCity(data?.city)
                closeCityPopup()
            },
            onError: (error) => {
                alert(error)
            }
        }
    )

    const clickCallback = (e: any) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            closeCityPopup()
        }
    }


    return (
        <>
            <div className={styles.wrapper}></div>
            <div className={styles.popupContainer} onClick={(e) => clickCallback(e)}>
                <div className={styles.popup} ref={popupRef}>
                    <VscChromeClose onClick={() => closeCityPopup()}/>
                    Выберите город
                    <input type="text" placeholder='Введите город' value={city} onChange={(e) => setCity(e.target.value)}/>
                    <button onClick={() => mutateAsync(city)}>Сохранить</button>
                </div>

            </div>
        </>

    );
};

export default CityPopup;