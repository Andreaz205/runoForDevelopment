import React, {FC, useEffect, useRef} from 'react';
import styles from '../HeaderNavigation.module.scss'
import LinkItem from "./LinkItem";
import headerBottomData from '../../header-bottom/header-bottom.data'

const NavigationItems :FC = ({ activeElement, setActiveElement, setDefaultActiveElement, setBottomLinks}) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        ref?.current?.addEventListener('mouseleave', setDefaultActiveElement)
        return () => ref?.current?.removeEventListener('mouseleave', setDefaultActiveElement)
    }, [])

    return (
        <div className={styles.navigationWrapper} ref={ref} id='navigation'>
            {headerBottomData.map(item => (
                <div key={item.link} style={{height: '100%'}}>
                    <LinkItem title={item.name} link={item.link} setActiveElement={setActiveElement} activeElement={activeElement} setBottomLinks={setBottomLinks}/>
                </div>
            ))}
        </div>
    );
};

export default NavigationItems;