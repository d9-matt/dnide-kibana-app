/*
 * Portal9 app - Portal9 Constants file
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import path  from 'path';

// Index patterns - Portal9 alerts
export const WAZUH_INDEX_TYPE_ALERTS = "alerts";
export const WAZUH_ALERTS_PREFIX = "portal9-alerts-";
export const WAZUH_ALERTS_PATTERN = "portal9-alerts-*";

// Default number of shards and replicas for indices
export const WAZUH_INDEX_SHARDS = 2;
export const WAZUH_INDEX_REPLICAS = 0;

// Job - Portal9 monitoring
export const WAZUH_INDEX_TYPE_MONITORING = "monitoring";
export const WAZUH_MONITORING_PREFIX = "portal9-monitoring-";
export const WAZUH_MONITORING_PATTERN = "portal9-monitoring-*";
export const WAZUH_MONITORING_TEMPLATE_NAME = "portal9-agent";
export const WAZUH_MONITORING_DEFAULT_INDICES_SHARDS = 1;
export const WAZUH_MONITORING_DEFAULT_CREATION = 'w';
export const WAZUH_MONITORING_DEFAULT_ENABLED = true;
export const WAZUH_MONITORING_DEFAULT_FREQUENCY = 900;
export const WAZUH_MONITORING_DEFAULT_CRON_FREQ = '0 * * * * *';

// Job - Portal9 statistics
export const WAZUH_INDEX_TYPE_STATISTICS = "statistics";
export const WAZUH_STATISTICS_DEFAULT_PREFIX = "portal9";
export const WAZUH_STATISTICS_DEFAULT_NAME = "statistics";
export const WAZUH_STATISTICS_PATTERN = `${WAZUH_STATISTICS_DEFAULT_PREFIX}-${WAZUH_STATISTICS_DEFAULT_NAME}-*`;
export const WAZUH_STATISTICS_TEMPLATE_NAME = `${WAZUH_STATISTICS_DEFAULT_PREFIX}-${WAZUH_STATISTICS_DEFAULT_NAME}`;
export const WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS = WAZUH_INDEX_SHARDS;
export const WAZUH_STATISTICS_DEFAULT_CREATION = 'w';
export const WAZUH_STATISTICS_DEFAULT_STATUS = true;
export const WAZUH_STATISTICS_DEFAULT_FREQUENCY = 900;
export const WAZUH_STATISTICS_DEFAULT_CRON_FREQ = '0 */5 * * * *';

// Job - Portal9 initialize
export const WAZUH_INDEX = '.portal9';
export const WAZUH_VERSION_INDEX = '.portal9-version';
export const WAZUH_KIBANA_TEMPLATE_NAME = 'portal9-kibana';

// Permissions
export const WAZUH_ROLE_ADMINISTRATOR_ID = 1;
export const WAZUH_ROLE_ADMINISTRATOR_NAME = 'administrator';

// Sample data
export const WAZUH_SAMPLE_ALERT_PREFIX = "portal9-alerts-4.x-";
export const WAZUH_SAMPLE_ALERTS_INDEX_SHARDS = 1;
export const WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS = 0;
export const WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY = "security";
export const WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING = "auditing-policy-monitoring";
export const WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = "threat-detection";
export const WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = 3000;
export const WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = {
  [WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY]: [{ syscheck: true }, { aws: true }, { gcp: true }, { authentication: true }, { ssh: true }, { apache: true, alerts: 2000 }, { web: true }, { windows: { service_control_manager: true }, alerts: 1000 }],
  [WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING]: [{ rootcheck: true }, { audit: true }, { openscap: true }, { ciscat: true }],
  [WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION]: [{ vulnerabilities: true }, { virustotal: true }, { osquery: true }, { docker: true }, { mitre: true }]
};

// Security
export const WAZUH_SECURITY_PLUGIN_XPACK_SECURITY = 'X-Pack Security';
export const WAZUH_SECURITY_PLUGIN_OPEN_DISTRO_FOR_ELASTICSEARCH = 'Open Distro for Elasticsearch';

export const WAZUH_SECURITY_PLUGINS = [
  WAZUH_SECURITY_PLUGIN_XPACK_SECURITY,
  WAZUH_SECURITY_PLUGIN_OPEN_DISTRO_FOR_ELASTICSEARCH
];

// App configuration
export const WAZUH_CONFIGURATION_CACHE_TIME = 10000 // time in ms;
export const WAZUH_CONFIGURATION_SETTINGS_NEED_RESTART = [
  'portal9.monitoring.enabled',
  'portal9.monitoring.frequency',
  'cron.statistics.interval',
  'logs.level',
];
export const WAZUH_CONFIGURATION_SETTINGS_NEED_HEALTH_CHECK = [
  'pattern',
  'portal9.monitoring.replicas',
  'portal9.monitoring.creation',
  'portal9.monitoring.pattern',
  'alerts.sample.prefix',
  'cron.statistics.index.name',
  'cron.statistics.index.creation',
  'cron.statistics.index.shards',
  'cron.statistics.index.replicas',
  'portal9.monitoring.shards'
];
export const WAZUH_CONFIGURATION_SETTINGS_NEED_RELOAD = [
  'hideManagerAlerts',
  'customization.logo.sidebar'
];

// Reserved ids for Users/Role mapping
export const WAZUH_API_RESERVED_ID_LOWER_THAN = 100;

// Portal9 data path
const WAZUH_DATA_KIBANA_BASE_PATH = 'data';
export const WAZUH_DATA_KIBANA_BASE_ABSOLUTE_PATH = path.join(__dirname, '../../../', WAZUH_DATA_KIBANA_BASE_PATH);
export const WAZUH_DATA_ABSOLUTE_PATH = path.join(WAZUH_DATA_KIBANA_BASE_ABSOLUTE_PATH, 'portal9');

// Portal9 data path - config
export const WAZUH_DATA_CONFIG_DIRECTORY_PATH = path.join(WAZUH_DATA_ABSOLUTE_PATH, 'config');
export const WAZUH_DATA_CONFIG_APP_PATH = path.join(WAZUH_DATA_CONFIG_DIRECTORY_PATH, 'portal9.yml');
export const WAZUH_DATA_CONFIG_REGISTRY_PATH = path.join(WAZUH_DATA_CONFIG_DIRECTORY_PATH, 'portal9-registry.json');

// Portal9 data path - logs
export const WAZUH_DATA_LOGS_DIRECTORY_PATH = path.join(WAZUH_DATA_ABSOLUTE_PATH, 'logs');
export const WAZUH_DATA_LOGS_PLAIN_PATH = path.join(WAZUH_DATA_LOGS_DIRECTORY_PATH, 'portal9app-plain.log');
export const WAZUH_DATA_LOGS_RAW_PATH = path.join(WAZUH_DATA_LOGS_DIRECTORY_PATH, 'portal9app.log');

// Portal9 data path - downloads
export const WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH = path.join(WAZUH_DATA_ABSOLUTE_PATH, 'downloads');
export const WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = path.join(WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH, 'reports');

// Queue
export const WAZUH_QUEUE_CRON_FREQ = '*/15 * * * * *'; // Every 15 seconds

// Default App Config
export const WAZUH_DEFAULT_APP_CONFIG = {
  pattern: WAZUH_ALERTS_PATTERN,
  'checks.pattern': true,
  'checks.template': true,
  'checks.api': true,
  'checks.setup': true,
  'checks.fields': true,
  'checks.metaFields': true,
  'checks.maxBuckets': true,
  'checks.timeFilter': true,
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
  'portal9.monitoring.enabled': WAZUH_MONITORING_DEFAULT_ENABLED,
  'portal9.monitoring.frequency': WAZUH_MONITORING_DEFAULT_FREQUENCY,
  'portal9.monitoring.shards': WAZUH_MONITORING_DEFAULT_INDICES_SHARDS,
  'portal9.monitoring.replicas': WAZUH_INDEX_REPLICAS,
  'portal9.monitoring.creation': WAZUH_MONITORING_DEFAULT_CREATION,
  'portal9.monitoring.pattern': WAZUH_MONITORING_PATTERN,
  'cron.prefix': WAZUH_STATISTICS_DEFAULT_PREFIX,
  'cron.statistics.status': WAZUH_STATISTICS_DEFAULT_STATUS,
  'cron.statistics.apis': [],
  'cron.statistics.interval': WAZUH_STATISTICS_DEFAULT_CRON_FREQ,
  'cron.statistics.index.name': WAZUH_STATISTICS_DEFAULT_NAME,
  'cron.statistics.index.creation': WAZUH_STATISTICS_DEFAULT_CREATION,
  'cron.statistics.index.shards': WAZUH_INDEX_SHARDS,
  'cron.statistics.index.replicas': WAZUH_INDEX_REPLICAS,
  'alerts.sample.prefix': WAZUH_SAMPLE_ALERT_PREFIX,
  hideManagerAlerts: false,
  'logs.level': 'info',
  'enrollment.dns': '',
  'customization.logo.app':'logotype.svg',
  'customization.logo.sidebar':'icon_blue.png',
  'customization.logo.healthcheck':'icon_blue.svg',
  'customization.logo.reports':'logo.png'
};

// Portal9 errors
export const WAZUH_ERROR_DAEMONS_NOT_READY = 'ERROR3099';

// Agents
export enum WAZUH_AGENTS_OS_TYPE{
  WINDOWS = 'windows',
  LINUX = 'linux',
  SUNOS = 'sunos',
  DARWIN = 'darwin',
  OTHERS = ''
}

export enum WAZUH_MODULES_ID {
  SECURITY_EVENTS = 'general',
  INTEGRITY_MONITORING = 'fim',
  AMAZON_WEB_SERVICES = 'aws',
  GOOGLE_CLOUD_PLATFORM = 'gcp',
  POLICY_MONITORING = 'pm',
  SECURITY_CONFIGURATION_ASSESSMENT = 'sca',
  AUDITING = 'audit',
  OPEN_SCAP = 'oscap',
  VULNERABILITIES = 'vuls',
  OSQUERY = 'osquery',
  DOCKER = 'docker',
  MITRE_ATTACK = 'mitre',
  PCI_DSS = 'pci',
  HIPAA = 'hipaa',
  NIST_800_53 = 'nist',
  TSC = 'tsc',
  CIS_CAT = 'ciscat',
  VIRUSTOTAL = 'virustotal',
  GDPR = 'gdpr',
}

export enum WAZUH_MENU_MANAGEMENT_SECTIONS_ID {
  MANAGEMENT = 'management',
  ADMINISTRATION = 'administration',
  RULESET = 'ruleset',
  RULES = 'rules',
  DECODERS = 'decoders',
  CDB_LISTS = 'lists',
  GROUPS = 'groups',
  CONFIGURATION = 'configuration',
  STATUS_AND_REPORTS = 'statusReports',
  STATUS = 'status',
  CLUSTER = 'monitoring',
  LOGS = 'logs',
  REPORTING = 'reporting',
  STATISTICS = 'statistics',
}

export enum WAZUH_MENU_TOOLS_SECTIONS_ID {
  API_CONSOLE = 'devTools',
  RULESET_TEST = 'logtest',
}

export enum WAZUH_MENU_SECURITY_SECTIONS_ID {
  USERS = 'users',
  ROLES = 'roles',
  POLICIES = 'policies',
  ROLES_MAPPING = 'roleMapping',
}

export enum WAZUH_MENU_SETTINGS_SECTIONS_ID {
  SETTINGS = 'settings',
  API_CONFIGURATION = 'api',
  MODULES = 'modules',
  SAMPLE_DATA = 'sample_data',
  CONFIGURATION = 'configuration',
  LOGS = 'logs',
  MISCELLANEOUS = 'miscellaneous',
  ABOUT = 'about',
}

export const AUTHORIZED_AGENTS = 'authorized-agents';

// Portal9 links
export const WAZUH_LINK_DOCUMENTATION = 'https://documentation.portal9.com';
export const WAZUH_LINK_GITHUB = 'https://github.com/portal9';
export const WAZUH_LINK_GOOGLE_GROUPS = 'https://groups.google.com/forum/#!forum/portal9';
export const WAZUH_LINK_SLACK = 'https://portal9.com/community/join-us-on-slack';

export const HEALTH_CHECK = 'health-check';

// Health check
export const HEALTH_CHECK_REDIRECTION_TIME = 300; //ms

// Kibana settings
// Default timeTilter set by the app
export const WAZUH_KIBANA_SETTING_TIME_FILTER = {
  from: "now-24h",
  to: 'now'
};
export const KIBANA_SETTING_NAME_TIME_FILTER = 'timepicker:timeDefaults';

// Default maxBuckets set by the app
export const WAZUH_KIBANA_SETTING_MAX_BUCKETS = 200000;
export const KIBANA_SETTING_NAME_MAX_BUCKETS = 'timelion:max_buckets';

// Default metaFields Kibana setting set by the app
export const WAZUH_KIBANA_SETTING_METAFIELDS = ['_source', '_index'];
export const KIBANA_SETTING_NAME_METAFIELDS = 'metaFields';