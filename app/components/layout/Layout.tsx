import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import Header from "./header/Header";
import styles from './Layout.module.scss'
import Footer from "@/components/layout/footer/Footer";
import Login from "@/ui/login/Login";
import Banner from "@/ui/banner/Banner";
import dynamic from "next/dynamic";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Favorite from "@/ui/Favorite/Favorite";
import {CSSTransition} from "react-transition-group";
import CityPopup from "@/ui/CityPopup/CityPopup";
import {useActions} from "@/hooks/useActions";

const DynamicLoginPage = dynamic(
    () =>  import('../ui/login/Login'), {ssr: false}
)

const DynamicRegisterPage = dynamic(
    () =>  import('../ui/register/Register'), {ssr: false}
)

const DynamicFavoritePage = dynamic(
    () =>  import('../ui/Favorite/Favorite'), {ssr: false}
)

const DynamicCityPopup = dynamic(() => import('../ui/CityPopup/CityPopup'), {ssr: false})


const Layout :FC <PropsWithChildren> = ({children}) => {
    const ref = useRef<null|HTMLDivElement>(null)
    const {isOpenLoginPopup, isOpenRegisterPopup} = useTypedSelector(state => state.user)
    const {isOpenFavoritePopup} = useTypedSelector(state => state.favorite)
    const {isOpen: isOpenCityPopup} = useTypedSelector(state => state.session)

    let transformed = false

    const transform = (flag: boolean) => {
        transformed = flag
    }

    const transformUpContent = () => {
         ref.current.style.cssText = 'transition: .5s ease-in-out; transform: translateY(0px);'
    }

    const transformDownContent = () => {

         ref.current.style.cssText = 'transition: .3s ease-in-out; transform: translateY(0px);'
    }


    return (
        <div className={styles.superWrapper}>

            <CSSTransition in={isOpenLoginPopup} timeout={100} unmountOnExit classNames='alert'>
                <DynamicLoginPage />
            </CSSTransition>

            <CSSTransition in={isOpenCityPopup} timeout={100} unmountOnExit classNames='alert'>
                <DynamicCityPopup />
            </CSSTransition>

            <CSSTransition in={isOpenRegisterPopup} timeout={100} unmountOnExit classNames='alert'>
                <DynamicRegisterPage />
            </CSSTransition>


            <CSSTransition in={isOpenFavoritePopup} timeout={100} unmountOnExit classNames='alert'>
                <DynamicFavoritePage />
            </CSSTransition>

            <Header transformUpContent={transformUpContent} transformDownContent={transformDownContent}/>
                <div className={styles.mainWrapper} ref={ref}>
                    {children}
                </div>
            <Footer />
        </div>

    );
};

export default Layout;