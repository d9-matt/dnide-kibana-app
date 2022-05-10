/*
 * Portal9 app - Resolve function to parse configuration file
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import {
  PORTAL9_ALERTS_PATTERN,
  PORTAL9_INDEX_REPLICAS,
  PORTAL9_INDEX_SHARDS,
  PORTAL9_MONITORING_DEFAULT_INDICES_SHARDS,
  PORTAL9_MONITORING_PATTERN,
  PORTAL9_SAMPLE_ALERT_PREFIX
} from "../../../common/constants";

export async function getWzConfig($q, genericReq, portal9Config) {
  // Remember to keep this values equal to default portal9.yml values
  const defaultConfig = {
    pattern: PORTAL9_ALERTS_PATTERN,
    'checks.pattern': true,
    'checks.template': true,
    'checks.api': true,
    'checks.setup': true,
    'checks.fields': true,
    'checks.metaFields': true,
    'checks.timeFilter': true,
    'checks.maxBuckets': true,
    'extensions.pci': true,
    'extensions.gdpr': true,
    'extensions.hipaa': true,
    'extensions.nist': true,
    'extensions.tsc': true,
    'extensions.audit': true,
    'extensions.oscap': false,
    'extensions.ciscat': false,
    'extensions.aws': false,
    'extensions.gcp': false,
    'extensions.virustotal': false,
    'extensions.osquery': false,
    'extensions.docker': false,
    timeout: 20000,
    'api.selector': true,
    'ip.selector': true,
    'ip.ignore': [],
    'xpack.rbac.enabled': true,
    'portal9.monitoring.enabled': true,
    'portal9.monitoring.frequency': 900,
    'portal9.monitoring.shards': PORTAL9_MONITORING_DEFAULT_INDICES_SHARDS,
    'portal9.monitoring.replicas': PORTAL9_INDEX_REPLICAS,
    'portal9.monitoring.creation': 'w',
    'portal9.monitoring.pattern': PORTAL9_MONITORING_PATTERN,
    'cron.prefix': 'portal9',
    'cron.statistics.status': true,
    'cron.statistics.apis': [],
    'cron.statistics.interval': '0 */5 * * * *',
    'cron.statistics.index.name': 'statistics',
    'cron.statistics.index.creation': 'w',
    'cron.statistics.index.shards': PORTAL9_INDEX_SHARDS,
    'cron.statistics.index.replicas': PORTAL9_INDEX_REPLICAS,
    'alerts.sample.prefix': PORTAL9_SAMPLE_ALERT_PREFIX,
    hideManagerAlerts: false,
    'logs.level': 'info',
    'enrollment.dns': '',
    'enrollment.password': '',
    'customization.logo.app':'Portal9_logo.svg',
    'customization.logo.sidebar':'Portal9_icon.png',
    'customization.logo.healthcheck':'Portal9_tr_final-01.svg',
    'customization.logo.reports':'Portal9_logo.png'
  };

  try {
    const config = await genericReq.request('GET', '/utils/configuration', {});

    if (!config || !config.data || !config.data.data)
      throw new Error('No config available');

    const ymlContent = config.data.data;

    if (
      typeof ymlContent === 'object' &&
      (Object.keys(ymlContent) || []).length
    ) {
      // Replace default values with custom values from portal9.yml file
      for (const key in ymlContent) {
        defaultConfig[key] = ymlContent[key];
      }
    }

    portal9Config.setConfig(defaultConfig);
  } catch (error) {
    portal9Config.setConfig(defaultConfig);
    console.log('Error parsing portal9.yml, using default values.'); // eslint-disable-line
    console.log(error.message || error); // eslint-disable-line
  }
  return $q.resolve(defaultConfig);
}
