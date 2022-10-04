import { Logger } from "../services";
import { IReviews, IReviewsFilterOptions } from "./interfaces";
const reviews: IReviews[] = require('./data.json');

export class ReviewsModel {
    constructor(private logger: Logger) { }

    public getReviews(filterOptions?: IReviewsFilterOptions): IReviews[] {
        return filterOptions && Object.keys(filterOptions).length
            ? reviews.filter(
                review => {
                    return (
                        (!filterOptions.rating || review.rating === Number(filterOptions.rating)) &&
                        (!filterOptions.source || review.review_source === filterOptions.source) &&
                        (!filterOptions.date || new Date(review.reviewed_date).toISOString().split("T")[0] === new Date(filterOptions.date).toISOString().split("T")[0])
                    )
                })
            : reviews;
    }

    public storeReviews(review: IReviews) {
        reviews.push(review);

        return review;
    }

    public reportByMonthlyStore() {
        const result = reviews.reduce(
            (a, b) => {
                const date = new Date(b.reviewed_date);

                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                a[b.review_source] = (a[b.review_source] || {});
                a[b.review_source][month] = (a[b.review_source][month] || {});
                a[b.review_source][month][year] = (a[b.review_source][month][year] || { totalReviews: 0, totalRating: 0, average: 0 });

                const newTotalReview = a[b.review_source][month][year].totalReviews + 1;
                const newTotalRating = a[b.review_source][month][year].totalRating + Number(b.rating);

                a[b.review_source][month][year] = {
                    totalReviews: newTotalReview,
                    totalRating: newTotalRating,
                    average: (newTotalRating / newTotalReview).toFixed(2)
                };

                return a;
            }, {} as {
                [store: string]: {
                    [month: string]: {
                        [year: string]: {
                            totalReviews: number,
                            totalRating: number,
                            average: string
                        }
                    }
                }
            }
        );

        return result;
    }

    public reportTotalRatingByCategory() {
        const result = reviews.reduce(
            (a, b) => {
                a[b.rating] = (a[b.rating] || 0) + 1;

                return a;
            }, {} as { [rating: string]: number }
        );

        return result;
    }
}
