import {instance} from "@/api/api";

export const SaleService = {
    async fetchSales() {
        return instance.get('/api/sales/published')
    },
    async getSaleProducts(id: number) {
        return instance.get(`/api/sales/${id}/products`)
    }
}