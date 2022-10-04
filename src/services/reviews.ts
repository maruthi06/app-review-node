import { ReviewsDb } from "../models";
import { IReviews, IReviewsFilterOptions } from "../models/interfaces";
import { ReviewsModel } from "../models/reviews";
import { Logger } from "./logger";

export class ReviewsService {
    constructor(
        private reviewsDb: ReviewsDb,
        private reviewsModel: ReviewsModel,
        private logger: Logger
    ) { }

    public async getReviews(filterOptions?: IReviewsFilterOptions) {
        const result = await this.reviewsDb.getReviews(filterOptions);

        return result;
    }

    public async storeReviews(review: IReviews) {
        const result = await this.reviewsDb.storeReview(review);

        return result;
    }

    public async reportByRatingDb(rating?: number) {
        return await this.reviewsDb.reportByRating(rating);
    }

    public async reportByStoreByMonth(store?: any, year?: string, month?: string) {
        return await this.reviewsDb.reportByStoreByMonth(store, year, month);
    }

    public reportByMonth(store?: string, month?: string) {
        const result = this.reviewsModel.reportByMonthlyStore();

        if (store) {
            const storeResult = result[store];

            if (month && store) {
                return {
                    [store]: {
                        [month]: storeResult[month] || []
                    }
                };
            }

            return {
                [store]: storeResult || {}
            };
        }

        return result;
    }

    public reportByRating(rating?: string) {
        const result = this.reviewsModel.reportTotalRatingByCategory();

        if (rating !== undefined) {
            return { [rating]: result[rating] };
        }

        return result;
    }
}
