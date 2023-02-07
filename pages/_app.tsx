import '../styles/globals.scss'
import '../styles/rich.scss'
import type { AppProps } from 'next/app'
import MainProvider from "../app/providers/MainProvider";
import Head from "next/head";
import {GetStaticProps} from "next";
import {CategoryService} from "@/services/CategoryService";

export default function App({ Component, pageProps }: AppProps) {
  return <MainProvider>
    <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap" rel="stylesheet"/>
    </Head>
    <Component {...pageProps}/>
  </MainProvider>
}

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const data = await CategoryService.all()
//     console.log(data)
//     return {
//       props: {
//         data
//       },
//       revalidate: 60*60*24
//     }
//   } catch (e) {
//     console.log(e)
//     return {
//       notFound: true
//     }
//   }
// }
