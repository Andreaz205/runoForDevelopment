import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import styles from './PopupSearch.module.scss'
import {HiSearch} from "react-icons/hi";
// import VariantItem from "@/ui/search/VariantItem/VariantItem";
import {useSearch} from "@/ui/search/useSearch";
import VariantItem from "@/ui/search/VariantItem/VariantItem";
import SkeletonLoader from "@/ui/Skeleton/SkeletonLoader";


const PopupSearch: FC<{ setIsOpen: Dispatch<SetStateAction<boolean>>, isOpen: boolean }> = ({setIsOpen, isOpen}) => {
    const [variants, setVariants] = useState([])
    const {handleSearch, searchTerm, isSuccess, isLoading, data} = useSearch(setVariants)

    const ref = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => document.addEventListener('click', clickCallback), 200)
        }
        if (inputRef.current) {
            inputRef.current.focus()
        }
        return () => {
            document.removeEventListener('click', clickCallback)
        }
    }, [isOpen, inputRef])

    const clickCallback = (e: any) => {
        e.stopPropagation()
        if (!(ref.current && (e.target === ref.current || ref.current.contains(e.target)))) {
            setIsOpen(false)
        }
    }

    return (
        <div className={styles.popup} ref={ref}>
            <div className={styles.searchInput}>
                <input type="text" value={searchTerm} onChange={(e) => handleSearch(e)} ref={inputRef}/>
                <button title='Поиск'>
                    <HiSearch />
                </button>
            </div>
            <div className={styles.content}>
                {isLoading ? (
                    <SkeletonLoader count={8} className={styles.skeleton}/>
                ) : variants && variants.length ? (
                    <div className={styles.searchedItems}>
                        {
                            variants && variants.length
                                ? variants.map(variant => (
                                    <VariantItem variant={variant} key={variant.id}/>
                                )): null
                        }
                    </div>
                ) : <div>Ничего не найдено!</div>}
            </div>

        </div>
    )
};

export default PopupSearch;