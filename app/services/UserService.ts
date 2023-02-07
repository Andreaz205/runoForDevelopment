import {instance} from "@/api/api";

export const UserService = {
    async getAuthUser() {
        return await instance.get('/api/user')
    }
}