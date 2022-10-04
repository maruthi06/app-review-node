import { Logger } from "../../services";
import { ReviewsService } from "../../services/reviews";

export interface IReviews {
    review: string;
    author: string;
    review_source: string;
    rating: number;
    title: string;
    product_name: string;
    reviewed_date: Date;
};

export interface IReviewsFilterOptions extends IPaginationParams {
    date?: string;
    source?: string;
    rating?: number;
}

interface IPaginationParams {
    size?: number;
    page?: number;
}

export interface IDependencies {
    reviewsService: ReviewsService,
    logger: Logger
}