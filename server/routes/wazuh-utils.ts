/*
 * Portal9 app - Module for Portal9 utils routes
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { Portal9UtilsCtrl } from '../controllers';
import { IRouter } from 'kibana/server';
import { schema } from '@kbn/config-schema';

export function Portal9UtilsRoutes(router: IRouter) {
  const ctrl = new Portal9UtilsCtrl();

  // Returns the portal9.yml file parsed
  router.get(
    {
      path: '/utils/configuration',
      validate: false
    },
    async (context, request, response) => ctrl.getConfigurationFile(context, request, response)
  );

  // Returns the portal9.yml file in raw
  router.put(
    {
      path: '/utils/configuration',
      validate: {
        body: schema.object({
          key: schema.string(),
          value: schema.any()
        })
      }
    },
    async (context, request, response) => ctrl.updateConfigurationFile(context, request, response)
  );

  // Returns Portal9 app logs
  router.get(
    {
      path: '/utils/logs',
      validate: false
    },
    async (context, request, response) => ctrl.getAppLogs(context,request, response)
  );
}
