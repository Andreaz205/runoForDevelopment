
import {instance} from "@/api/api";

export const CategoryService = {
    async hits() {
        return instance.get('/api/categories/hits')
    },

    async byId(id: number) {
        return instance.get(`/api/categories/${id}`)
    },

    async all() {
        return instance.get('/api/categories')
    },

    async popular() {
        return instance.get('/api/categories/popular')
    },

    async sliderCategories() {
        return instance.get('/api/categories/slider')
    }
}