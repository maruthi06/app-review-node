import * as express from "express";
import { RequestValidatorMiddleWare } from "../middlewares";
import { IDependencies, IReviews, IReviewsFilterOptions } from "../models";

export function reviewsRoute(dependencies: IDependencies) {
    const router = express.Router();

    const { logger, reviewsService } = dependencies;

    router.get("/", async (req, res) => {
        const filterOptions: IReviewsFilterOptions = req.query;
        const result = await reviewsService.getReviews(filterOptions);

        res.json(result);
    });

    router.post("/search", async (req, res) => {
        const filterOptions: IReviewsFilterOptions = req.body;
        const result = await reviewsService.getReviews(filterOptions);

        res.json(result);
    });

    router.post("/", RequestValidatorMiddleWare(logger), async (req, res) => {
        const reviewObj: IReviews = req.body;

        const result = await reviewsService.storeReviews(reviewObj);

        res.status(201).send(result);
    });

    return router;
}