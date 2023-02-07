import React, {FC} from 'react';
import styles from "@/ui/About/Menu.module.scss";
import Link from "next/link";
import {useRouter} from "next/router";
import cn from "classnames";

const Menu:FC = () => {
    const {pathname} = useRouter()

    return (
        <div className={styles.main}>
            <div className={styles.separator}></div>
            <div className={styles.menu}>
                <Link href={'/site/about'} className={cn(styles.link, {[styles.active]: pathname === '/site/about'})}>О компании</Link>
                <Link href={'/site/industry'} className={cn(styles.link, {[styles.active]: pathname === '/site/industry'})}>Производство</Link>
                <Link href={'/site/materials'} className={cn(styles.link, {[styles.active]: pathname === '/site/materials'})}>Ткани</Link>
            </div>
        </div>
    );
};

export default Menu;