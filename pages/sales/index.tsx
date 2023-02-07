import React from 'react';
import {GetStaticProps, NextPage} from "next";
import {SaleService} from "@/services/SaleService";
import Sales from "@/screens/Sales/Sales";

const SalesPage:NextPage = ({data}) => {
    return (
    <Sales sales={data}/>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    try {
        let {data} = await SaleService.fetchSales()
        return {
            props: {
                data
            }
        }
    } catch (e) {
        console.log(e)
        return {
            notFound: true
        }
    }

}

export default SalesPage;