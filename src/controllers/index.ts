import * as express from "express";
import { IDependencies } from "../models";
import { reportRoute } from "./report";
import { reviewsRoute } from "./reviews";

export function Router(dependencies: IDependencies) {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.send("Server is up & running");
    });

    router.use("/reviews", reviewsRoute(dependencies));
    router.use("/report", reportRoute(dependencies));

    return router;
}