import React, {FC, useState} from 'react';
import styles from './Search.module.scss'
import {HiSearch} from 'react-icons/hi'
import dynamic from "next/dynamic";
import {CSSTransition} from "react-transition-group";

const DynamicPopupSearch = dynamic(import('@/ui/search/PopupSearch/PopupSearch'), {
    ssr: false
})

const Search :FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onFocusCallback = () => {
        setIsOpen(true)
    }
    return (
        <div className={styles.search}>
            <CSSTransition timeout={300} in={isOpen} classNames='alert' unmountOnExit>
                <DynamicPopupSearch setIsOpen={setIsOpen} isOpen={isOpen}/>
            </CSSTransition>

            <input type="text" placeholder='Введите запрос' onFocus={() => onFocusCallback()}/>
            <button>
                <HiSearch />
            </button>
        </div>
    );
};

export default Search;