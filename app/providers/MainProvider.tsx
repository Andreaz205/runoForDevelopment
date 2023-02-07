import React, {FC, PropsWithChildren} from 'react';
import Layout from "../components/layout/Layout";
import {QueryClient, QueryClientProvider} from "react-query";
import HeadProvider from "./HeadProvider/HeadProvider";
import {Provider} from "react-redux";
import {store} from '@/store/store'
import ReduxToast from "./ReduxToast/ReduxToast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const MainProvider :FC <PropsWithChildren>= ({children}) => {
    return (
        <HeadProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ReduxToast />
                    <Layout>
                        {children}
                    </Layout>
                </QueryClientProvider>
            </Provider>
        </HeadProvider>

    );
};

export default MainProvider;