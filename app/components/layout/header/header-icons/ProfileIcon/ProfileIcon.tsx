import React, {FC} from 'react';
import {BsFillPersonFill, BsPerson} from "react-icons/bs";
import styles from "./ProfileIcon.module.scss";
import Link from "next/link";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";

const ProfileIcon :FC = () => {
    const {user} = useTypedSelector(state => state.user)
    const {logout, openLoginPopup, openRegisterPopup} = useActions()

    return (
        <div className={styles.icon}>

            {user
                ?
                    <>
                        <a href='#'>
                            <BsFillPersonFill />
                        </a>
                        <div className={styles.loginBar}>
                            <div>
                                Привет, {user.name}
                            </div>
                            <a onClick={() => logout()}>Выйти</a>
                        </div>
                    </>
                :
                    <>
                        <Link href='/profile'>
                            <BsPerson />
                        </Link>
                        <div className={styles.loginBar}>
                            <a onClick={() => openLoginPopup()}>
                                Войти
                            </a> или
                            <a onClick={() => openRegisterPopup()}> зарегестрироваться</a>
                        </div>
                    </>
            }

        </div>
    );
};

export default ProfileIcon;
