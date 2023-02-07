import React from 'react';
import {GetStaticProps, NextPage} from "next";
import Catalog from "../../app/components/screens/Catalog/Catalog";
import {useRouter} from "next/router";
import {VariantService} from "@/services/VariantService";
import {CategoryService} from "@/services/CategoryService";

const CatalogPage : NextPage= ({data, categoryData}) => {
    console.log(categoryData)
    return (
        <Catalog variants={data} categories={categoryData}/>
    );
};

export default CatalogPage;

export const getStaticProps:GetStaticProps = async () => {
    try {
        const {data} = await VariantService.limitVariants(20)
        const categoryResponse = await CategoryService.sliderCategories()
        let categoryData = categoryResponse.data
        return {
            props: {
                data,
                categoryData
            }
        }
    } catch (e) {
        console.log(e);
        return {
            notFound: true
        }
    }

}