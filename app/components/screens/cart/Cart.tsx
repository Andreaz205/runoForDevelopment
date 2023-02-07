import React, {useRef} from 'react';
import styles from '@/screens/cart/Cart.module.scss'
import Price from "@/ui/Price/Price";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import CartItem from "@/ui/Cart/CartItem/CartItem";
import {postfix1} from "@/utils/builders/postfix1";
import OrderForm from "@/ui/Cart/OrderForm/OrderForm";

const Cart = () => {
    const confirmRef = useRef<any>(null)

    const {cart, amount, sum} = useTypedSelector(state => state.cart)

    const scroll = () => {
        // let height = calculateComponentHeight()
        confirmRef.current && confirmRef.current?.scrollIntoView({behavior: "smooth", block: "center"})
    }

    return (
        <>
            <div className={styles.cartWrapper}>
                <div className={styles.header}>
                <span>
                  Корзина
                </span>
                </div>
                {cart && cart?.length ? (
                        <>
                            <div className={styles.cart}>
                                <div className={styles.cartItems}>
                                    {cart.map(item => (
                                        <CartItem key={item.id} item={item}/>
                                    ))}
                                </div>
                                <div className={styles.payment}>
                                    <div className={styles.summary}>Итого {amount} {'товар' + postfix1(amount)} на сумму
                                    </div>
                                    <Price price={sum}/>

                                    <div className={styles.delivery}>
                                    <span>
                                        Стоимость доставки
                                    </span>
                                        <div className={styles.deliveryPrice}>
                                            + 700 P
                                        </div>
                                    </div>
                                    <button className={styles.orderButton} onClick={() => scroll()}>
                                        Оформить заказ
                                    </button>
                                </div>
                            </div>

                            <OrderForm ref={confirmRef} />

                        </>
                    )
                    : (
                        <div style={{textAlign: "center", padding: '100px 0', fontSize: 30}}>
                            Ваша корзина пуста
                        </div>
                    )}
            </div>
        </>);
};

export default Cart;