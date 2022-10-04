import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Logger } from "../services";

export function ErrorHandlerMiddleWare(): ErrorRequestHandler {
    return (error: Error, req: Request, res: Response, next: NextFunction) => {
        // handle error;
        res.send();
    }
}