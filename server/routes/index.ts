import { IRouter } from 'kibana/server';
import { Portal9ApiRoutes } from './portal9-api';
import { Portal9ElasticRoutes } from "./portal9-elastic";
import { Portal9HostsRoutes } from "./portal9-hosts";
import { Portal9UtilsRoutes } from "./portal9-utils";
import { Portal9ReportingRoutes } from "./portal9-reporting";

export const setupRoutes = (router: IRouter) => {
    Portal9ApiRoutes(router);
    Portal9ElasticRoutes(router);
    Portal9HostsRoutes(router);
    Portal9UtilsRoutes(router);
    Portal9ReportingRoutes(router);
};
