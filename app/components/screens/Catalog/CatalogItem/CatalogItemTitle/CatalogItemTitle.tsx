import React, {FC} from 'react';
import styles from "./CatalogItemTitle.module.scss";

const CatalogItemTitle :FC<{title: string}> = ({title}) => {
    return (
        <div>
            <div className={styles.itemTitle}>{title}</div>
        </div>
    );
};

export default CatalogItemTitle;