import React, {FC} from 'react';
import HeaderContacts from "./header-contacts/HeaderContacts";
import HeaderIcons from "./header-icons/HeaderIcons";
import iconItemsData from "./header-icons/icon-items.data";
import styles from './Header.module.scss'
import dynamic from "next/dynamic";

const DynamicHeaderIcons = dynamic(import('./header-icons/HeaderIcons'), {
    ssr: false
})

const DynamicHeaderContacts = dynamic(import('./header-contacts/HeaderContacts'), {
    ssr: false
})

const HeaderRightArea :FC= () => {
    return (
        <div className={styles.rightNode}>
            <DynamicHeaderContacts />
            <DynamicHeaderIcons />
        </div>
    );
};

export default HeaderRightArea;