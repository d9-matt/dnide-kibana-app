import { IRouter } from 'kibana/server';
import { WazuhApiRoutes } from './portal9-api';
import { WazuhElasticRoutes } from "./portal9-elastic";
import { WazuhHostsRoutes } from "./portal9-hosts";
import { WazuhUtilsRoutes } from "./portal9-utils";
import { WazuhReportingRoutes } from "./portal9-reporting";

export const setupRoutes = (router: IRouter) => {
    WazuhApiRoutes(router);
    WazuhElasticRoutes(router);
    WazuhHostsRoutes(router);
    WazuhUtilsRoutes(router);
    WazuhReportingRoutes(router);
};
