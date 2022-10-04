import { NextFunction, Request, RequestHandler, Response } from "express";
import * as joi from 'joi';

import { IReviews } from '../models';
import { Logger } from "../services";

export function RequestValidatorMiddleWare(logger: Logger): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        const validationSchema = joi.object<IReviews>(
            {
                author: joi.string().required(),
                product_name: joi.string().required(),
                rating: joi.number().required(),
                review: joi.string().required(),
                review_source: joi.string().required(),
                title: joi.string().required(),
                reviewed_date: joi.string().optional()
            }
        );

        const validation = validationSchema.validate(body);

        if (validation.error) {
            logger.error("Error validating request body", validation.error);
            return res.status(400).send(validation.error);
        } else {
            logger.info("Request validation successful", validation.value);
            next();
        }
    }
}