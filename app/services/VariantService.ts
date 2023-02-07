import {instance} from "@/api/api";

export const VariantService = {
    async all() {
        return instance.get('/api/variants')
    },

    async variantsByCategoryId (id: string, count?: number) {
        if (count) {
            return instance.get(`/api/variants/by-category/${id}/limit/${count}`)
        }
        return instance.get(`/api/variants/by-category/${id}`)
    },

    async variantsBySearchTerm (term: string) {
        return instance.get(`/api/variants/by-term/${term}`)
    },

    async limitVariants (count: number) {
        return instance.get(`/api/variants/limit/${count}`)
    }

    // async getFavoriteVariants(favorites){
    //     let queryString = 'id='
    //     favorites.map(favoriteItem => queryString += `${favoriteItem.id},`)
    //     // Удаляю последнюю запятую
    //     let query = queryString.substring(0, queryString.length - 1)
    //
    //     return instance.get(`/api/favorites/by-id?${query}`)
    // }
}