import React from 'react';
import {NextPage} from "next";
import Cart from "@/screens/cart/Cart";
import dynamic from "next/dynamic";

const DynamicCartItem = dynamic(import('@/screens/cart/Cart'), {
    ssr: false
})

const CartPage:NextPage= () => {
    return (
        <DynamicCartItem />
    );
};

export default CartPage;