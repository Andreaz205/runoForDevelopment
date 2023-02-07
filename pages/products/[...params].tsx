import React from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from "next";

import Product from "../../app/components/screens/product/Product";
import {instance} from "@/api/api";
import {imagePathBuilder} from "@/utils/builders/imagePathBuilder";
import {parseToDate} from "@/utils/parseToDate";
import {IReview} from "@/ui/reviews/reviews.interface";

const ProductPage:NextPage = ({serializedData}) => {
    console.log(serializedData)
    // instance.get('/api/products/1').then(res => console.log(res))
    // console.log(serializedData)
    return (
        // <div>Hello</div>
        <Product data={serializedData}/>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const {data} = await instance.get('/api/variants')
        const paths = data.map(variant => ({
            params: {params: [String(variant.id)]}
        }))
        return {paths, fallback: true}
    } catch(e) {
        console.log(e)
        return {
            paths: [],
            fallback: false
        }
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    try {
        const {data} = await instance.get(`/api/variants/${params.params[0]}`)
        let relatedItems = data?.related?.map(item => ({
            id: item.id,
            // title: item.title,
            link: '/products/' + item.id,
            image_url: 'http://localhost:8000/storage/' + item.images[0].path,
            price: item.price,
            rating: item.rating || 0,
            // categoryId: item?.categoryId,
            title: item.title
            // oldPrice: 60000,
            // sale: 10,
        }))

        if (data.reviews && data.reviews.length) data.reviews.map((review: IReview) => {
            review.created = parseToDate(review.created_at)
            // if (review.GridImages && review.GridImages.length) {
                // review.GridImages.map(img => imgs.push({
                //     id: img.id,
                //     link: '',
                //     imagePath: img.image_url,
                // }))
                // setReviewImages(imgs)
            // }
        })

        let serializedData = {
            ...data,
            related: relatedItems,
            images: data.images.map(image => ({
                id: image.id,
                original: imagePathBuilder(image.path),
                // thumbnail: imagePathBuilder(image.path)
            }))
        }


        return {
            props: {
                serializedData
            },
            revalidate: 60
        }
    } catch(e) {
        console.log(e)
        return {
            notFound: true
        }
    }
}

export default ProductPage;