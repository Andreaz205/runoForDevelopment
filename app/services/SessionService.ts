import {instance} from "@/api/api";

export const SessionService = {
    async getSessionData(){
        return instance.get('/api/session')
    },

    async setCity (city: string) {
        return instance.post('/api/session/city', {
            city: city
        })
    }
}