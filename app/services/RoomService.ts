import {instance} from "@/api/api";

export const RoomService = {
    async getRooms () {
        return instance.get('/api/rooms')
    },
    async getRoomVariants (id: number) {
       return instance.get(`/api/rooms/${id}`)
    }
}