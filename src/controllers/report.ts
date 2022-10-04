import * as express from "express";
import { IDependencies, IReviews } from "../models";

export function reportRoute(dependencies: IDependencies) {
    const router = express.Router();

    const { logger, reviewsService } = dependencies;

    router.get("/bymonth/:store?/:month?", (req, res) => {
        const { store, month } = req.params;

        const result = reviewsService.reportByMonth(store, month);

        res.send(result);
    });

    router.get("/bymonthdb/:store?/:year?/:month?", async (req, res) => {
        const { store, year, month } = req.params;

        const result = await reviewsService.reportByStoreByMonth(store, year, month);

        res.send(result);
    });

    router.get("/byrating/:rating?", (req, res) => {
        const { rating } = req.params;

        const result = reviewsService.reportByRating(rating);

        res.send(result);
    });

    router.get("/byratingdb/:rating?", async (req, res) => {
        const { rating } = req.params;

        const result = await reviewsService.reportByRatingDb(Number(rating));

        res.send(result);
    });

    return router;
}