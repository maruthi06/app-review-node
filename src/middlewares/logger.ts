import { NextFunction, Request, RequestHandler, Response } from "express";
import { Logger } from "../services";

export function LoggerMiddleWare(logger: Logger): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        logger.info('request ip: ', req.ip);
        logger.info('request method: ', req.method);
        logger.info('request path', req.path);

        next();
    }
}