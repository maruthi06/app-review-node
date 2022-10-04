import { ReviewsDb, ReviewsModel } from "./models";
import { Server } from "./server";
import { Logger, ReviewsService, DbConnection } from "./services";

(async () => {
    const logger = new Logger();
    try {
        
        const connectionString = process.env["MONGO_CONNECTION_STRING"] || "mongodb://localhost:27017/alexa-review";

        const dbConnection = new DbConnection(
            connectionString,
            logger
        );
        const instance = await dbConnection.createConnection();

        if (process.env.MODE !== 'test') {
            const reviewsDb = new ReviewsDb(instance, logger);
            const reviewModel = new ReviewsModel(logger);

            const reviewsService = new ReviewsService(
                reviewsDb,
                reviewModel,
                logger
            );

            const server = new Server(
                {
                    reviewsService,
                    logger
                }
            );

            server.run();
        }
    } catch (error) {
        logger.error("Error starting application", error);
        process.exit(1);
    }
})();