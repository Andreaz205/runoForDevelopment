import React, {useEffect, useState} from 'react';
import cn from 'classnames'
import styles from "./Catalog.module.scss";
import useWindowSize from "@/hooks/useWindowSize";
import CatalogItem from "./CatalogItem/CatalogItem";
import CatalogSlider from "@/ui/catalog-slider/CatalogSlider";
import CustomSlider from "@/ui/CustomSlider/CustomSlider";


const MemorizedCatalogItem = React.memo(CatalogItem)

const Catalog = ({variants, categories}) => {
    const [windowWidth, setWindowWidth] = useState<number>()

    const size = useWindowSize()
    useEffect(() => {
        setWindowWidth(size.width)
    }, [size])

    return (
        <div className={styles.wrapper}>
            {categories && categories.length && <CustomSlider items={categories}/>}
            <div className={styles.header}>
                <span>
                  {variants && variants.length &&  variants[0].categoryName ? variants[0].categoryName : 'Каталог'}
                </span>
            </div>
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
                    <MemorizedCatalogItem key={el.id} elementId={el.id} item={el}/>
                ))}
            </div>
        </div>
    );
};

export default Catalog;