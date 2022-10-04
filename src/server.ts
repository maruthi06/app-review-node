import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Logger } from './services';
import { LoggerMiddleWare } from './middlewares';
import { Router } from './controllers';
import { IDependencies } from './models';

export class Server {
    private app!: express.Express;

    constructor(
        private dependencies: IDependencies
    ) {
        this.dependencies.logger.info("Setting up the serve");

        this.app = express.default();

        this.dependencies.logger.info("Express App Initilized");

        this.bindMiddlewares();

        this.app.use("/", Router(this.dependencies));
    }

    private bindMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(LoggerMiddleWare(this.dependencies.logger));

        this.app.use((req, res, next) => {

            const allowedDomains = (process.env["ALLOWED_DOMAINS"] || "http://localhost:3000,https://amazon.com").split(",");

            const origin = req.headers.origin as string;

            if (allowedDomains.includes(origin)) {
                res.header('Access-Control-Allow-Origin', origin);
            }

            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', "Content-Type, Content-Length");
            res.header("Access-Control-Allow-Credentials", "true");

            if ('OPTIONS' === req.method) {
                res.sendStatus(200);
            } else {
                next();
            }
        });
    }

    private listenServer() {
        const port = process.env["PORT"] || 8080;

        const address = this.app.listen(port);

        address.on("listening", () => {
            this.dependencies.logger.info(`Server listening at`, address.address());
        });

        address.on("connect", () => {
            this.dependencies.logger.degug(`Server ruuning at`, address.address());
        });

        address.on("error", (error) => {
            this.dependencies.logger.error(`Error creating Server`, error);
        });

        address.on("close", () => {
            this.dependencies.logger.warn(`Closing server`);
        });
    }

    public getApp() {
        return this.app;
    }

    public run() {
        this.listenServer();
    }
}
