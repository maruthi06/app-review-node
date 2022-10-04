import { ReviewsDb, ReviewsModel } from "../src/models";
import * as express from 'express';
import { Server } from "../src/server";
import { DbConnection, Logger, ReviewsService } from "../src/services";

let reviewDb: ReviewsDb;
let reviewModel: ReviewsModel;
let dbConnection: DbConnection;
let logger: Logger;
let reviewsService: ReviewsService;
let app: express.Express;

export async function getAllDependencires() {
    if (!dbConnection) {
        logger = new Logger()
        dbConnection = new DbConnection(
            process.env["MONGO_CONNECTION_STRING"] as string,
            logger
        );

        const instance = await dbConnection.createConnection();

        reviewDb = new ReviewsDb(instance, logger);
        reviewModel = new ReviewsModel(logger);

        reviewsService = new ReviewsService(reviewDb, reviewModel, logger);

        const server = new Server({
            logger,
            reviewsService
        });

        app = server.getApp();
    }

    return {
        app,
        reviewDb,
        reviewModel,
        dbConnection,
        logger,
        reviewsService
    };
}