import { Db, Collection } from 'mongodb';

import { Logger } from "../services";
import { IReviews, IReviewsFilterOptions } from './interfaces';

export class ReviewsDb {
    private reviewsDb!: Collection<IReviews>;

    constructor(
        private db: Db,
        private logger: Logger
    ) {
        this.reviewsDb = this.db.collection("reviews");
    }

    public async deleteAll() {
        if (process.env.MODE === 'test') {
            await this.reviewsDb.deleteMany({});
        }
    }

    public async getReviews(filterOptions?: IReviewsFilterOptions) {
        try {
            const query: Partial<IReviews> = {};

            if (filterOptions) {
                if (filterOptions.date) {
                    query["reviewed_date"] = { "$gte": new Date(filterOptions.date), "$lt": new Date(new Date(filterOptions.date).getTime() + 24 * 60 * 60 * 1000) } as any;
                }

                if (filterOptions.rating) {
                    query["rating"] = Number(filterOptions.rating);
                }

                if (filterOptions.source) {
                    query["review_source"] = filterOptions.source;
                }
            }

            this.logger.info("Query to Db", query);

            const result = await this.reviewsDb.find(query)
                .sort({ _id: -1 })
                .skip((Number(filterOptions?.page) || 0) * (Number(filterOptions?.size) || 50))
                .limit(Number(filterOptions?.size) || 50)
                .toArray();

            return result;
        } catch (error) {
            console.log(error);

            this.logger.error("Error getting reviews", error);
            throw error;
        }
    }

    public async storeReview(review: IReviews) {
        try {
            review.reviewed_date = new Date();

            const insertResult = await this.reviewsDb.insertOne(review);

            this.logger.info("insert successful", insertResult);
            return insertResult;
        } catch (error) {
            this.logger.error("Error storing reviews", error);

            throw error;
        }
    }

    public async storeReviews(reviews: IReviews[]) {
        try {
            const insertResult = await this.reviewsDb.insertMany(reviews);

            this.logger.info("insert records successful", insertResult);
            return insertResult;
        } catch (error) {
            this.logger.error("Error storing reviews", error);

            throw error;
        }
    }

    public async reportByStoreByMonth(store?: string, year?: string, month?: string) {
        try {
            let match = {};

            if (store) {
                match = {
                    'review_source': store,
                }
            }

            if (year) {

                const fromDate = new Date(`${year}-${month}-01`);
                const toDate = new Date(new Date(fromDate).setMonth(fromDate.getMonth() + 1));

                console.log(toDate, fromDate);

                match = {
                    ...match,
                    'reviewed_date': {
                        '$gte': fromDate,
                        '$lt': toDate
                    }
                };
            }

            const result = await this.reviewsDb.aggregate(
                [
                    {
                        '$match': match
                    },
                    {
                        '$group': {
                            '_id': '$review_source',
                            'average': {
                                '$avg': '$rating'
                            }
                        }
                    }
                ]
            ).toArray();

            return result;
        } catch (error) {
            throw error;
        }
    }

    public async reportByRating(rating?: number) {
        try {
            let match = {};

            if (rating) {
                match = {
                    'rating': Number(rating),
                }
            }

            const result = await this.reviewsDb.aggregate(
                [
                    {
                        '$match': match
                    },
                    {
                        '$group': {
                            '_id': '$rating',
                            'count': {
                                '$sum': 1
                            }
                        }
                    }
                ]
            ).toArray();

            return result;
        } catch (error) {
            throw error;
        }
    }
}