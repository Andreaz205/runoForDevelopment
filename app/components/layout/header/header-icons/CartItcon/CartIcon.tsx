import React, {FC, useMemo} from 'react';
import styles from "./CartIcon.module.scss";
import Link from "next/link";
import {BsBag, BsFillBagFill} from "react-icons/bs";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/router";

const CartIcon:FC = () => {
    const {cart, amount} = useTypedSelector(state => state.cart)

    // const cartAmount = useMemo(() => {
    //     let sum = 0
    //     cart?.map(el => {
    //         sum += el.count
    //     })
    //     return sum
    // }, [cart])
    // console.log(cartAmount);
    return (
        <div className={styles.icon}>
            {cart && cart.length ? (
                <>
                    <Link href='/cart'>
                        <BsFillBagFill />
                    </Link>
                    <div className={styles.number}>{amount}</div>
                </>


            ) : (
                <Link href='/cart'>
                    <BsBag />
                </Link>
            )}

        </div>
    );
};

export default CartIcon;