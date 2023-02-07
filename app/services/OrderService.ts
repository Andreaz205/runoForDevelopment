import {IOrderInput} from "@/ui/Cart/IOrderInput";
import {instance} from "@/api/api";

export const OrderService = {
    async sendOrder(data: IOrderInput) {
        return instance.post('/api/orders', data)
    }
}