import Home from "../app/components/screens/home/Home";
import {GetStaticProps, NextPage} from "next";
import {CategoryService} from "@/services/CategoryService";
import {SaleService} from "@/services/SaleService";

export interface ISliderItems {
  id: number,
  link: string,
  imagePath: string,
  price: number,
  categoryId: number,
  title: string
}

const HomePage: NextPage = ({items, popularCategoryItems, salesItems}) =>  {
  return (
    <Home hits={items} popularCategoryItems={popularCategoryItems} salesItems={salesItems}/>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  try {
    const {data} = await CategoryService.hits()
    let items = data.map(item => ({
      id: item.id,
      // title: item.title,
      link: '/products/' + item.id,
      image_url: 'http://localhost:8000/storage/' + item.images[0]?.path,
      price: item.price || 0,
      categoryId: item.categoryId,
      title: item.product.title + ' ' +  item.title,
      // isFavorite: false
      // oldPrice: 60000,
      // sale: 10,
    }))

    const popularResponse = await CategoryService.popular()
    let popularCategories = popularResponse?.data
    let popularCategoryItems = popularCategories?.map(elem => ({
      id: elem.id,
      link: '/catalog/category/' + elem.id,
      image_url: elem.image_url,
      // price: elem.price,
      // categoryId: elem.id,
      // title: elem.name,
    }))

    let salesResponse = await SaleService.fetchSales()
    let sales = salesResponse?.data
    let salesItems = sales?.map(elem => ({
      id: elem.id,
      link: '/catalog/sales/' + elem.id,
      image_url: elem.image_url,
    }))

    return {
      props: {
        items,
        popularCategoryItems,
        salesItems
      },
      revalidate: 60
    }
  } catch (e) {
    console.log(e);
    return {
      notFound: true
    }
  }
}

export default HomePage
