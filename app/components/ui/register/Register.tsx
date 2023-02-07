import React, {FC, FormEvent, useState} from 'react';
import styles from "@/ui/login/Login.module.scss";
import {useActions} from "@/hooks/useActions";

const Register:FC = () => {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {register, closeRegisterPopup} = useActions()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let data = {
            email,
            password,
            name,
        }
        register(data)
    }

    return (
        <div>
            <div className={styles.background} onClick={() => closeRegisterPopup()}></div>
            <div className={styles.aside}>
                {/*<button onClick={() => setIsOpenRegisterPopup(false)}>Закрыть</button>*/}
                <form action="@/ui/login/Login" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id='email' type="email" placeholder='Введите email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password" placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id='name' type="name" placeholder='Введите имя' value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <button type='submit'>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;