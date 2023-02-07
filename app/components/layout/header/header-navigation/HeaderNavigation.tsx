import React, {FC} from 'react';
import Search from "@/ui/search/Search";
import styles from './HeaderNavigation.module.scss'
import NavigationItems from "./navigation-items/NavigationItems";
import navItems from './navigation-items/data'

const HeaderNavigation :FC = ({activeElement, setActiveElement, setDefaultActiveElement, setBottomLinks}) => {
    return (
        <div className={styles.navigationSearchWrapper}>
            <NavigationItems  activeElement={activeElement} setActiveElement={setActiveElement} setDefaultActiveElement={setDefaultActiveElement} setBottomLinks={setBottomLinks}/>

            <Search />
        </div>
    );
};

export default HeaderNavigation;