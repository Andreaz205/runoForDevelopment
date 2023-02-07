import React, {FC, FormEvent, useState} from 'react';
import {instance} from "@/api/api";
import {useRouter} from "next/router";
import styles from './Login.module.scss'
import Cookies from "js-cookie";
import {clearCookieToken} from "@/api/helpers/clearCookieToken";
import {login} from "@/store/user/user.actions";
import {useDispatch} from "react-redux";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const Login :FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, closeLoginPopup} = useActions()
    const {isLoading} = useTypedSelector(state => state.user)

    const {push} = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let data = {
            email: email,
            password: password
        }
        login(data)
    }

    return (
        <div>
            <div className={styles.background} onClick={() => closeLoginPopup()}></div>
            <div className={styles.aside}>
                {isLoading && <div>Loading...</div>}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id='email' type="email" placeholder='Введите email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password" placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type='submit'>Войти</button>
                    </div>
                </form>

            </div>
        </div>

    );
};

export default Login;