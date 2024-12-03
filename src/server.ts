import path from "path";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import Logger from "./utils/logger";
import { HTTP_CODES, Namespaces } from "./config/constants";
import ResponseHandler from "./utils/response-handler";

export const createApp = (bindRoutes: (app: Express) => void, name: string = "Blackhole"): Express => {
    const app = express();
    const logger = new Logger("general", Namespaces.Entry);

    app.use(cors());

    app.use((req: Request, res: Response, next: NextFunction) => {
        logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on("finish", () => {
            logger.info(
                `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
            );
        });

        next();
    });

    app.set("trust proxy", true);
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "handlebars");

    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname));
    app.disable("x-powered-by");

    bindRoutes(app);

    app.get("/", async (req: Request, res: Response) => {
        return ResponseHandler.sendSuccessResponse({
            res,
            code: HTTP_CODES.OK,
            message: `Welcome to ${name}`,
        });
    });

    app.all("*", (req, res: Response) => {
        logger.error(`Requested route not found | PATH: [${req.url}]`);
        return ResponseHandler.sendErrorResponse({
            res,
            code: HTTP_CODES.NOT_FOUND,
            error: "Requested route not found",
        });
    });

    return app;
};
