import { createApp } from "../server";
import Logger from "../utils/logger";
import { APP_PORT } from "../config/env.config";
import { Namespaces } from "../config/constants";
import { bindUserRoutes } from "../routes";

const logger = new Logger("general", Namespaces.Entry);

const name = "Mono Prototype";

export const init = () => createApp(bindUserRoutes, name);

init().listen(APP_PORT || process.env.PORT, () => {
    logger.info(`User Server started successfully on ${APP_PORT}`);
});
