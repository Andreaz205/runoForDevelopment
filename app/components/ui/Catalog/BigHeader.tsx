import React, {FC} from 'react';
import styles from "@/ui/Catalog/Catalog.module.scss";

const BigHeader: FC<{title: string}> = ({title}) => {
    return (
        <div className={styles.header}>
            <span>
              {title}
            </span>
        </div>
    );
};

export default BigHeader;