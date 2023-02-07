import {instance} from "@/api/api";

export const FileService = {
    async uploadImages(data: any) {
        return instance.post(`/api/variants/${data.variantId}/reviews/images`, data.formData)
    }
}