import React, {FC, useEffect, useState} from 'react';
import Logo from "./logo/Logo";
import HeaderNavigation from "./header-navigation/HeaderNavigation";
import styles from './Header.module.scss'
import HeaderRightArea from "./HeaderRightArea";
import TopHeader from "./top-header/TopHeader";
import HeaderBottom from "./header-bottom/HeaderBottom";
import headerBottomData from "./header-bottom/header-bottom.data";
import dynamic from "next/dynamic";

const DynamicHeaderBottom = dynamic(import('./header-bottom/HeaderBottom'), {
    ssr: false
})

const Header :FC = ({
    transformDownContent,
    transformUpContent,
    setIsOpenRegisterPopup
}) => {
    let firstItem = headerBottomData[0].name
    let firstBottomLinks = headerBottomData[0].items
    const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false)
    const [isOpenHeaderBottom, setIsOpenHeaderBottom] = useState<boolean>(false)
    const [activeElement, setActiveElement] = useState(firstItem)
    const [bottomLinks, setBottomLinks] = useState(firstBottomLinks)
    const [isTransformed, setIsTransformed] = useState(false)

    // const [doc, setDoc] = useState()

    let doc
    useEffect(() => {
         doc = document
    },[])

    const setDefaultActiveElement = (e: any) => {
        if (e.relatedTarget?.id === 'header-bottom' || e.relatedTarget?.querySelector('a')) {
            return
        }
        setActiveElement(firstItem)
    }

    // let setDefaultActiveElementFromHeaderBottom = (e: any) => {
    //     if (e.relatedTarget?.id !== 'navigation' ) setActiveElement(firstItem)
    // }
    let transformed = false

    const transform = (flag: boolean) => {
        setIsTransformed(flag)
        transformed = flag
    }

    const transformOut = () => {
        let middleWrapper = doc.querySelector('#middle-wrapper')
        let headerBottom = doc.querySelector('#header-bottom-wrapper')
        let middleHeader = doc.querySelector('#middle-header')
        let topWrapper = doc.querySelector('#top-header')
        let headerWrapper = doc.querySelector('#header-wrapper')
        transformDownContent()
        headerWrapper.style.cssText = 'transform: translateY(0px); transition: .3s ease-in-out'
        headerBottom.style.cssText = 'transition: .3s ease-in-out; position: absolute; bottom: -50px; width: 100vw'
        transform(false)
    }

    const transformIn = () => {
        let middleWrapper = doc.querySelector('#middle-wrapper')
        let headerBottom = doc.querySelector('#header-bottom-wrapper')
        let middleHeader = doc.querySelector('#middle-header')
        let topWrapper = doc.querySelector('#top-header')
        let headerWrapper = doc.querySelector('#header-wrapper')
        transformUpContent()
        headerWrapper.style.cssText = 'transform: translateY(-35px); transition: .3s ease-in-out'
        headerBottom.style.cssText = 'transition: .3s ease-in-out; position: absolute; bottom: -5px; width: 100vw'
        transform(true)
    }


    useEffect(() => {
        const handleScroll = (event: any) => {
            if (window.scrollY > 70) {
                if (!transformed) {
                    transformIn()
                }
            } else {
                if (transformed) {
                    transformOut()
                }
            }
        };
        let middleHeader = doc.querySelector('#middle-header')
        middleHeader.addEventListener('mouseover', middleHeaderMouseoverCallback)
        middleHeader.addEventListener('mouseleave', middleHeaderMouseleaveCallback)
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            middleHeader.removeEventListener('mouseover', middleHeaderMouseoverCallback)
            middleHeader.removeEventListener('mouseleave', middleHeaderMouseleaveCallback)
        };
    }, []);


    const middleHeaderMouseoverCallback = () => {
        if (transformed) {
            let headerBottom = doc.querySelector('#header-bottom-wrapper')
            headerBottom.style.transform = 'translateY(40px)'
        }
    }

    const middleHeaderMouseleaveCallback = (e: any) => {
        let headerBottom = doc.querySelector('#header-bottom-wrapper')
        let middleHeader = doc.querySelector('#middle-header')
        if (e.target === middleHeader) return
        headerBottom.style.transform = 'translateY(0px)'
    }

    useEffect(() => {
        if (isTransformed && !isOpenDetails) {
            console.log('translate')
            let headerBottom = document.querySelector('#header-bottom-wrapper')
            headerBottom.style.transform = 'translateY(0px)'
        }
    }, [isOpenDetails, isTransformed, doc])

    return (
        <div className={styles.headerPanel} id='header-wrapper'>
            <TopHeader />
            <div style={{height: 50, display: 'flex', justifyContent: 'center'}} id='middle-wrapper'>

                <div className={styles.movingWrapper}>
                    <div className={styles.header} id='middle-header'>

                        <div className={styles.leftNode}>
                            <Logo />
                            <HeaderNavigation activeElement={activeElement} setActiveElement={setActiveElement} setDefaultActiveElement={setDefaultActiveElement} setBottomLinks={setBottomLinks} />
                        </div>

                        <HeaderRightArea />
                    </div>
                </div>

                <DynamicHeaderBottom isOpenDetails={isOpenDetails} setIsOpenDetails={setIsOpenDetails} bottomLinks={bottomLinks} setActiveElement={setActiveElement} setBottomLinks={setBottomLinks}/>
            </div>
        </div>
    );
};

export default Header;