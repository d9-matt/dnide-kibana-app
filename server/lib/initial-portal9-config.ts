/*
 * Portal9 app - Initial basic configuration file
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

export const initialPortal9Config: string = `---
#
# Portal9 app - App configuration file
# Copyright (C) 2015-2021 Portal9, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#
# ======================== Portal9 app configuration file ========================
#
# Please check the documentation for more information on configuration options:
# https://documentation.portal9.com/current/installation-guide/index.html
#
# Also, you can check our repository:
# https://github.com/portal9/portal9-kibana-app
#
# ------------------------------- Disable roles -------------------------------
#
# Defines which Elasticsearch roles disable Portal9
# disabled_roles: 
#      - portal9_disabled
#
# ------------------------------- Index patterns -------------------------------
#
# Default index pattern to use.
#pattern: wazuh-alerts-*
#
# ----------------------------------- Checks -----------------------------------
#
# Defines which checks must to be consider by the healthcheck
# step once the Portal9 app starts. Values must to be true or false.
#checks.pattern : true
#checks.template: true
#checks.api     : true
#checks.setup   : true
#checks.metaFields: true
#checks.timeFilter: true
#checks.maxBuckets: true
#
# --------------------------------- Extensions ---------------------------------
#
# Defines which extensions should be activated when you add a new API entry.
# You can change them after Portal9 app starts.
# Values must to be true or false.
#extensions.pci       : true
#extensions.gdpr      : true
#extensions.hipaa     : true
#extensions.nist      : true
#extensions.tsc       : true
#extensions.audit     : true
#extensions.oscap     : false
#extensions.ciscat    : false
#extensions.aws       : false
#extensions.gcp       : false
#extensions.virustotal: false
#extensions.osquery   : false
#extensions.docker    : false
#
# ---------------------------------- Timeout ----------------------------------
#
# Defines maximum timeout to be used on the Portal9 app requests.
# It will be ignored if it is bellow 1500.
# It means milliseconds before we consider a request as failed.
# Default: 20000
#timeout: 20000
#
# -------------------------------- API selector --------------------------------
#
# Defines if the user is allowed to change the selected
# API directly from the Portal9 app top menu.
# Default: true
#api.selector: true
#
# --------------------------- Index pattern selector ---------------------------
#
# Defines if the user is allowed to change the selected
# index pattern directly from the Portal9 app top menu.
# Default: true
#ip.selector: true
#
# List of index patterns to be ignored
#ip.ignore: []
#
# -------------------------------- X-Pack RBAC ---------------------------------
#
# Custom setting to enable/disable built-in X-Pack RBAC security capabilities.
# Default: enabled
#xpack.rbac.enabled: true
#
# ------------------------------ portal9-monitoring ------------------------------
#
# Custom setting to enable/disable portal9-monitoring indices.
# Values: true, false, worker
# If worker is given as value, the app will show the Agents status
# visualization but won't insert data on portal9-monitoring indices.
# Default: true
#portal9.monitoring.enabled: true
#
# Custom setting to set the frequency for portal9-monitoring indices cron task.
# Default: 900 (s)
#portal9.monitoring.frequency: 900
#
# Configure portal9-monitoring-* indices shards and replicas.
#portal9.monitoring.shards: 1
#portal9.monitoring.replicas: 0
#
# Configure portal9-monitoring-* indices custom creation interval.
# Values: h (hourly), d (daily), w (weekly), m (monthly)
# Default: w
#portal9.monitoring.creation: w
#
# Default index pattern to use for Portal9 monitoring
#portal9.monitoring.pattern: portal9-monitoring-*
#
# --------------------------------- portal9-cron ----------------------------------
#
# Customize the index prefix of predefined jobs
# This change is not retroactive, if you change it new indexes will be created
# cron.prefix: portal9
#
# --------------------------------- portal9-sample-alerts -------------------------
#
# Customize the index name prefix of sample alerts
# This change is not retroactive, if you change it new indexes will be created
# It should match with a valid index template to avoid unknown fields on
# dashboards
#alerts.sample.prefix: wazuh-alerts-4.x-
#
# ------------------------------ portal9-statistics -------------------------------
#
# Custom setting to enable/disable statistics tasks.
#cron.statistics.status: true
#
# Enter the ID of the APIs you want to save data from, leave this empty to run
# the task on all configured APIs
#cron.statistics.apis: []
#
# Define the frequency of task execution using cron schedule expressions
#cron.statistics.interval: 0 */5 * * * *
#
# Define the name of the index in which the documents are to be saved.
#cron.statistics.index.name: statistics
#
# Define the interval in which the index will be created
#cron.statistics.index.creation: w
#
# Configure statistics indices shards and replicas.
#cron.statistics.shards: 2
#cron.statistics.replicas: 0
#
# ------------------------------ portal9-logo-customization -------------------------------
#
#Define the name of the app logo saved in the path /plugins/portal9/assets/
#customization.logo.app: logotype.svg
#
#Define the name of the sideba logo saved in the path /plugins/portal9/assets/
#customization.logo.sidebar: icon_blue.png
#
#Define the name of the health-check logo saved in the path /plugins/portal9/assets/
#customization.logo.healthcheck: icon_blue.svg
#
#
#Define the name of the reports logo (.png) saved in the path /plugins/portal9/assets/
#customization.logo.reports: logo.png
#
# ---------------------------- Hide manager alerts ------------------------------
# Hide the alerts of the manager in all dashboards and discover
#hideManagerAlerts: false
#
# ------------------------------- App logging level -----------------------------
# Set the logging level for the Portal9 App log files.
# Default value: info
# Allowed values: info, debug
#logs.level: info
#
# -------------------------------- Enrollment DNS -------------------------------
# Set the variable PORTAL9_REGISTRATION_SERVER in agents deployment.
# Default value: ''
#enrollment.dns: ''
#
# Portal9 registration password
# Default value: ''
#enrollment.password: ''
#-------------------------------- API entries -----------------------------------
#The following configuration is the default structure to define an API entry.
#
#hosts:
#  - <id>:
      # URL
      # API url
      # url: http(s)://<url>

      # Port
      # API port
      # port: <port>

      # Username
      # API user's username
      # username: <username>

      # Password
      # API user's password
      # password: <password>

      # Run as
      # Define how the app user gets his/her app permissions.
      # Values:
      #   - true: use his/her authentication context. Require Portal9 API user allows run_as.
      #   - false or not defined: get same permissions of Portal9 API user.
      # run_as: <true|false>
hosts:
  - default:
     url: https://localhost
     port: 55000
     username: portal9-wui
     password: portal9-wui
     run_as: false
`
