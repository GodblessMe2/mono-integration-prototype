import { Express } from "express";
import mono from "./mono.route";

export const bindUserRoutes = (app: Express): void => {
    app.use("/api/mono", mono);
};
