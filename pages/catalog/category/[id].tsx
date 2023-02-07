import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {RoomService} from "@/services/RoomService";
import {CategoryService} from "@/services/CategoryService";
import {VariantService} from "@/services/VariantService";
import Catalog from "@/ui/Catalog/Catalog";


const CategoryPage:NextPage = ({data}) => {

    return <Catalog variants={data}/>


}

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const {data} = await CategoryService.all()
        const paths = data.map(category => ({
            params: {
                id: String(category.id)
            }
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
        const {data} = await VariantService.variantsByCategoryId(params.id)
        return {
            props: {
                data
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

export default  CategoryPage
