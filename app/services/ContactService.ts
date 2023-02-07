import {instance} from "@/api/api";

export const ContactService = {
    async getContacts() {
        return instance.get('/api/contacts')
    }
}