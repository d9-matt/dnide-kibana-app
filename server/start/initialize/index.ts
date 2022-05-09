/*
 * Portal9 app - Module for app initialization
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { log } from '../../lib/logger';
import packageJSON from '../../../package.json';
import { kibanaTemplate } from '../../integration-files/kibana-template';
import { getConfiguration } from '../../lib/get-configuration';
import { totalmem } from 'os';
import fs from 'fs';
import { ManageHosts } from '../../lib/manage-hosts';
import { PORTAL9_ALERTS_PATTERN, PORTAL9_DATA_CONFIG_REGISTRY_PATH, PORTAL9_INDEX, PORTAL9_VERSION_INDEX, PORTAL9_KIBANA_TEMPLATE_NAME, PORTAL9_DATA_KIBANA_BASE_ABSOLUTE_PATH } from '../../../common/constants';
import { createDataDirectoryIfNotExists } from '../../lib/filesystem';
import { tryCatchForIndexPermissionError } from '../tryCatchForIndexPermissionError';

const manageHosts = new ManageHosts();

export function jobInitializeRun(context) {
  const KIBANA_INDEX = context.server.config.kibana.index;
  log('initialize', `Kibana index: ${KIBANA_INDEX}`, 'info');
  log('initialize', `App revision: ${packageJSON.revision}`, 'info');

  let configurationFile = {};
  let pattern = null;
  // Read config from package.json and portal9.yml
  try {
    configurationFile = getConfiguration();

    pattern =
      configurationFile && typeof configurationFile.pattern !== 'undefined'
        ? configurationFile.pattern
        : PORTAL9_ALERTS_PATTERN;
    // global.XPACK_RBAC_ENABLED =
    //   configurationFile &&
    //     typeof configurationFile['xpack.rbac.enabled'] !== 'undefined'
    //     ? configurationFile['xpack.rbac.enabled']
    //     : true;
  } catch (error) {
    log('initialize', error.message || error);
    context.portal9.logger.error(
      'Something went wrong while reading the configuration.' + (error.message || error)
    );
  }

  try {
    // RAM in MB
    const ram = Math.ceil(totalmem() / 1024 / 1024);
    log('initialize', `Total RAM: ${ram}MB`, 'info');
  } catch (error) {
    log(
      'initialize',
      `Could not check total RAM due to: ${error.message || error}`
    );
  }

  // Save Portal9 App setup
  const saveConfiguration = async () => {
    try {
      const commonDate = new Date().toISOString();

      const configuration = {
        name: 'Portal9 App',
        'app-version': packageJSON.version,
        revision: packageJSON.revision,
        installationDate: commonDate,
        lastRestart: commonDate,
        hosts: {}
      };
      try {
        createDataDirectoryIfNotExists();
        createDataDirectoryIfNotExists('config');
        await fs.writeFileSync(PORTAL9_DATA_CONFIG_REGISTRY_PATH, JSON.stringify(configuration), 'utf8');
        log(
          'initialize:saveConfiguration',
          'Portal9 configuration registry inserted',
          'debug'
        );
      } catch (error) {
        log('initialize:saveConfiguration', error.message || error);
        context.portal9.logger.error(
          'Could not create Portal9 configuration registry'
        );
      }
    } catch (error) {
      log('initialize:saveConfiguration', error.message || error);
      context.portal9.logger.error(
        'Error creating portal9-version registry'
      );
    }
  };

  /**
   * Checks if the .portal9 index exist in order to migrate to portal9.yml
   */
  const checkPortal9Index = tryCatchForIndexPermissionError(PORTAL9_INDEX)( async () => {
    log('initialize:checkPortal9Index', `Checking ${PORTAL9_INDEX} index.`, 'debug');
    const result = await context.core.elasticsearch.client.asInternalUser.indices.exists({
      index: PORTAL9_INDEX
    });
    if (result.body) {
      const data = await context.core.elasticsearch.client.asInternalUser.search({
        index: PORTAL9_INDEX,
        size: 100
      });
      const apiEntries = (((data || {}).body || {}).hits || {}).hits || [];
      await manageHosts.migrateFromIndex(apiEntries);
      log(
        'initialize:checkPortal9Index',
        `Index ${PORTAL9_INDEX} will be removed and its content will be migrated to portal9.yml`,
        'debug'
      );
      // Check if all APIs entries were migrated properly and delete it from the .portal9 index
      await checkProperlyMigrate();
      await context.core.elasticsearch.client.asInternalUser.indices.delete({
        index: PORTAL9_INDEX
      });
    }
  });

  /**
   * Checks if the API entries were properly migrated
   * @param {Array} migratedApis
   */
  const checkProperlyMigrate = async () => {
    try {
      let apisIndex = await await context.core.elasticsearch.client.asInternalUser.search({
        index: PORTAL9_INDEX,
        size: 100
      });
      const hosts = await manageHosts.getHosts();
      apisIndex = ((apisIndex.body || {}).hits || {}).hits || [];

      const apisIndexKeys = apisIndex.map(api => {
        return api._id;
      });
      const hostsKeys = hosts.map(api => {
        return Object.keys(api)[0];
      });

      // Get into an array the API entries that were not migrated, if the length is 0 then all the API entries were properly migrated.
      const rest = apisIndexKeys.filter(k => {
        return !hostsKeys.includes(k);
      });

      if (rest.length) {
        throw new Error(
          `Cannot migrate all API entries, missed entries: (${rest.toString()})`
        );
      }
      log(
        'initialize:checkProperlyMigrate',
        'The API entries migration was successful',
        'debug'
      );
    } catch (error) {
      log('initialize:checkProperlyMigrate', `${error}`, 'error');
      return Promise.reject(error);
    }
  };

  /**
   * Checks if the .portal9-version exists, in this case it will be deleted and the portal9-registry.json will be created
   */
  const checkPortal9Registry = async () => {
    try {
      log(
        'initialize:checkportal9Registry',
        'Checking portal9-version registry.',
        'debug'
      );
      try {
       const exists = await context.core.elasticsearch.client.asInternalUser.indices.exists({
          index: PORTAL9_VERSION_INDEX
        });        
        if (exists.body){
          await context.core.elasticsearch.client.asInternalUser.indices.delete({
            index: PORTAL9_VERSION_INDEX
          });
          log(
            'initialize[checkportal9Registry]',
            `Successfully deleted old ${PORTAL9_VERSION_INDEX} index.`,
            'debug'
          );
        };
      } catch (error) {
        log(
          'initialize[checkportal9Registry]',
          `No need to delete old ${PORTAL9_VERSION_INDEX} index`,
          'debug'
        );
      }

      if(!fs.existsSync(PORTAL9_DATA_KIBANA_BASE_ABSOLUTE_PATH)){
        throw new Error(`The data directory is missing in the Kibana root instalation. Create the directory in ${PORTAL9_DATA_KIBANA_BASE_ABSOLUTE_PATH} and give it the required permissions (sudo mkdir ${PORTAL9_DATA_KIBANA_BASE_ABSOLUTE_PATH};sudo chown -R kibana:kibana ${PORTAL9_DATA_KIBANA_BASE_ABSOLUTE_PATH}). After restart the Kibana service.`);
      };

      if (!fs.existsSync(PORTAL9_DATA_CONFIG_REGISTRY_PATH)) {
        log(
          'initialize:checkportal9Registry',
          'portal9-version registry does not exist. Initializing configuration.',
          'debug'
        );

        // Create the app registry file for the very first time
        await saveConfiguration();
      } else {
        // If this function fails, it throws an exception
        const source = JSON.parse(fs.readFileSync(PORTAL9_DATA_CONFIG_REGISTRY_PATH, 'utf8'));

        // Check if the stored revision differs from the package.json revision
        const isUpgradedApp = packageJSON.revision !== source.revision || packageJSON.version !== source['app-version'];

        // Rebuild the registry file if revision or version fields are differents
        if (isUpgradedApp) { 
          log(
            'initialize:checkportal9Registry',
            'Portal9 app revision or version changed, regenerating portal9-version registry',
            'info'
          );
          // Rebuild registry file in blank
          await saveConfiguration();
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Init function. Check for "portal9-version" document existance.
  const init = async () => {
    await Promise.all([
      checkPortal9Index(),
      checkPortal9Registry()
    ]);
  };

  const createKibanaTemplate = () => {
    log(
      'initialize:createKibanaTemplate',
      `Creating template for ${KIBANA_INDEX}`,
      'debug'
    );

    try {
      kibanaTemplate.template = KIBANA_INDEX + '*';
    } catch (error) {
      log('initialize:createKibanaTemplate', error.message || error);
      context.portal9.logger.error(
        'Exception: ' + error.message || error
      );
    }

    return context.core.elasticsearch.client.asInternalUser.indices.putTemplate({
      name: PORTAL9_KIBANA_TEMPLATE_NAME,
      order: 0,
      create: true,
      body: kibanaTemplate
    });
  };

  const createEmptyKibanaIndex = async () => {
    try {
      log(
        'initialize:createEmptyKibanaIndex',
        `Creating ${KIBANA_INDEX} index.`,
        'info'
      );
      await context.core.elasticsearch.client.asInternalUser.indices.create({
        index: KIBANA_INDEX
      });
      log(
        'initialize:createEmptyKibanaIndex',
        `Successfully created ${KIBANA_INDEX} index.`,
        'debug'
      );
      await init();
      return;
    } catch (error) {
      return Promise.reject(
        new Error(
          `Error creating ${
          KIBANA_INDEX
          } index due to ${error.message || error}`
        )
      );
    }
  };

  const fixKibanaTemplate = async () => {
    try {
      await createKibanaTemplate();
      log(
        'initialize:checkKibanaStatus',
        `Successfully created ${KIBANA_INDEX} template.`,
        'debug'
      );
      await createEmptyKibanaIndex();
      return;
    } catch (error) {
      return Promise.reject(
        new Error(
          `Error creating template for ${
          KIBANA_INDEX
          } due to ${error.message || error}`
        )
      );
    }
  };

  const getTemplateByName = async () => {
    try {
      await context.core.elasticsearch.client.asInternalUser.indices.getTemplate({
        name: PORTAL9_KIBANA_TEMPLATE_NAME
      });
      log(
        'initialize:checkKibanaStatus',
        `No need to create the ${KIBANA_INDEX} template, already exists.`,
        'debug'
      );
      await createEmptyKibanaIndex();
      return;
    } catch (error) {
      log('initialize:checkKibanaStatus', error.message || error);
      return fixKibanaTemplate();
    }
  };

  // Does Kibana index exist?
  const checkKibanaStatus = async () => {
    try {
      const response = await context.core.elasticsearch.client.asInternalUser.indices.exists({
        index: KIBANA_INDEX
      });
      if (response.body) {
        // It exists, initialize!
        await init();
      } else {
        // No Kibana index created...
        log(
          'initialize:checkKibanaStatus',
          `Not found ${KIBANA_INDEX} index`,
          'info'
        );
        await getTemplateByName();
      }
    } catch (error) {
      log('initialize:checkKibanaStatus', error.message || error);
      context.portal9.logger.error(error.message || error);
    }
  };

  // Wait until Elasticsearch js is ready
  const checkStatus = async () => {
    try {
      // TODO: wait until elasticsearch is ready?
      // await server.plugins.elasticsearch.waitUntilReady();
      return await checkKibanaStatus();
    } catch (error) {
      log(
        'initialize:checkStatus',
        'Waiting for elasticsearch plugin to be ready...',
        'debug'
      );
      setTimeout(() => checkStatus(), 3000);
    }
  };

  // Check Kibana index and if it is prepared, start the initialization of Portal9 App.
  return checkStatus();
}
