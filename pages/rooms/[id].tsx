import Catalog from "@/ui/Catalog/Catalog";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import React from "react";
import {RoomService} from "@/services/RoomService";
import {instance} from "@/api/api";
import {imagePathBuilder} from "@/utils/builders/imagePathBuilder";



const RoomPage:NextPage = ({data}) => {
    return (
        <Catalog variants={data} />
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const {data} = await RoomService.getRooms()
        const paths = data.map(room => ({
            params: {
                id: String(room.id)
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
        const {data} = await RoomService.getRoomVariants(params.id)
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

export default RoomPage;