import React, {useEffect, useState} from 'react';
import cn from 'classnames'
import styles from "./Catalog.module.scss";
import useWindowSize from "../../../hooks/useWindowSize";
import CatalogItem from "./CatalogItem/CatalogItem";
import BigHeader from "@/ui/Catalog/BigHeader";

// let array = [
//     {id: 0},
//     {id: 1},
//     {id: 2},
//     {id: 3},
//     {id: 4},
//     {id: 5},
//     {id: 6},
//     {id: 7},
//     {id: 8},
//     {id: 9}
// ]

const Catalog = ({variants}) => {
    const [windowWidth, setWindowWidth] = useState<number>()
    const [hoveredId, setHoveredId] = useState<number|null>(null)

    const size = useWindowSize()
    useEffect(() => {
        setWindowWidth(size.width)
    }, [size])

    return (
        <div className={styles.wrapper}>
            <BigHeader title={'Каталог'} />
            <div className={styles.filters}>
                <button className={cn(styles.filterButton, styles.black)}>
                    Все фильтры
                </button>
                <button className={styles.filterButton}>
                    Цена
                </button>
                <button className={styles.filterButton}>
                    Размер
                </button>
            </div>
            <div className={styles.line}></div>
            <div className={styles.catalogItems}>
                {variants?.map(el => (
                    <CatalogItem key={el.id} setHoveredId={setHoveredId} elementId={el.id} hoveredId={hoveredId} item={el}/>
                ))}
            </div>
        </div>
    );
};

export default Catalog;