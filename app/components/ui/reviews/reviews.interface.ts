export interface IReview {
    number: number
    name: string
    content: string
    mark: number
    images?: IReviewImage[],
    created_at?: string
}

export interface IReviewImage {
    id: number
    image_url: string
}