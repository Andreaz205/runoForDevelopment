import {IReview} from "@/ui/reviews/reviews.interface";
import {instance} from "@/api/api";

export const ReviewService = {
    async storeReview(data: IReview, variantId) {
        return instance.post(`/api/variants/${variantId}/reviews`, data)
    }
}