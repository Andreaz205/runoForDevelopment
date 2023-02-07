import React, {FC} from 'react';
import styles from "@/ui/Cart/CartItem/CartItem.module.scss";
import {AiOutlineClose} from "react-icons/ai";
import {ICartItem} from "@/store/cart/cart.interface";
import {useActions} from "@/hooks/useActions";
import Image from "next/image";
import Link from "next/link";

const CartItem:FC<{item: ICartItem}> = ({item}) => {

    const {decrement, increment, deleteItem} = useActions()

    console.log(item.images)
    return (
        <div className={styles.cartItem}>
            <div className={styles.leftArea}>
                <Link href={`/products/${item.id}`}>
                    <div className={styles.image}>
                        <Image src={item.images[0]?.original} alt='' fill objectFit={'contain'}/>
                    </div>
                </Link>
            </div>
            <div className={styles.rightArea}>
                <div className={styles.info}>
                    <div className={styles.itemHeader}>{item.product.title}</div>
                    {/*<div className={styles.size}>Размер: 212 см х 151 см х 121 см  </div>*/}
                    {item?.optionNames.map(name => (
                        <div key={name.id} className={styles.values}>{name.title}: {name?.values?.map(value => name?.activeValueId === value.id && <span key={value.id} >{value.title}</span>)}</div>
                    ))}
                </div>
                <div className={styles.operations}>
                    <div className={styles.deleteButton}>
                        <button onClick={() => deleteItem(item)}>
                            <span>Удалить</span>
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className={styles.countPrice}>
                        <div className={styles.count}>
                            <button className={styles.decrementButton} onClick={() => decrement(item)}>
                                -
                            </button>
                            <div className={styles.number}>
                                {item.count}
                            </div>
                            <button className={styles.incrementButton} onClick={() => increment(item)}>
                                +
                            </button>
                        </div>
                        <div className={styles.price}>
                            {item.price} P
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartItem;