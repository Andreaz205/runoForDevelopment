import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {SaleService} from "@/services/SaleService";
import Sale from "@/ui/sales/Sale/Sale";

const SalePage : NextPage= ({data}) => {
    console.log(data)
    return (
        <Sale products={data}/>
    )
};

export default SalePage;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        let {data} = await SaleService.fetchSales()
        // const {data} = await SaleService.getSaleProducts()
        const paths = data.map(sale => ({
            params: {id: String(sale.id)}
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

export const getStaticProps:GetStaticProps = async ({params}) => {
    try {
        const {data} = await SaleService.getSaleProducts(+params.id)

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