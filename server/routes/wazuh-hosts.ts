/*
 * Portal9 app - Module for Portal9-API routes
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { Portal9HostsCtrl } from '../controllers';
import { IRouter } from 'kibana/server';
import { schema } from '@kbn/config-schema';

export function Portal9HostsRoutes(router: IRouter) {
  const ctrl = new Portal9HostsCtrl();

  // Get Portal9-API entries list (Multimanager) from elasticsearch index
  router.get({
      path: '/hosts/apis',
      validate: false
    },
    async (context, request, response) => ctrl.getHostsEntries(context, request, response)
  );
  
  // Updates the cluster-info or manager-info
  router.put(
    {
      path: '/hosts/update-hostname/{id}',
      validate: {
        params: schema.object({
          id: schema.string()
        }),
        body: schema.object({
          cluster_info: schema.any()
        })
      }
    },
    async (context, request, response) => ctrl.updateClusterInfo(context, request, response)
  )

  // Checks the orphan hosts in the registry in order to delete them
  router.post(
    {
      path: '/hosts/remove-orphan-entries',
      validate: {
        body: schema.object({
          entries: schema.arrayOf(schema.any())
        })
      }
    },
    async (context, request, response) => ctrl.removeOrphanEntries(context, request, response)
  )
}
