import {GetStaticProps, NextPage} from "next";
import {RoomService} from "@/services/RoomService";
import Rooms from "@/screens/rooms/Rooms";

export interface ICategory {
    id: number,
    name: string,
    parent_category_id: number,
    created_at: string,
    updated_at: string,
    is_published: false,
    pivot: Object
}

export interface IRoom {
    id:number,
    title:string,
    image_url:string,
    categories:ICategory[]
}

const RoomsPage:NextPage<{rooms: IRoom[]}> = ({rooms}) => {
    return (
        <Rooms rooms={rooms} />
    );
};


export const getStaticProps: GetStaticProps = async () => {
    try {
        const {data} = await RoomService.getRooms()
        console.log(data)
        let rooms = data
        return {
            props: {
                rooms,
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


export default RoomsPage;