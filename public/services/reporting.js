/*
 * Portal9 app - Reporting service
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import $ from 'jquery';
import moment from 'moment';
import { Portal9Config } from '../react-services/portal9-config';
import { GenericRequest } from '../react-services/generic-request';
import { ErrorHandler } from '../react-services/error-handler';

export class ReportingService {
  constructor(
    $rootScope,
    vis2png,
    rawVisualizations,
    visHandlers,
    errorHandler
  ) {
    this.$rootScope = $rootScope;
    this.vis2png = vis2png;
    this.rawVisualizations = rawVisualizations;
    this.visHandlers = visHandlers;
    this.genericReq = GenericRequest;
    this.errorHandler = errorHandler;
    this.portal9Config = new Portal9Config();
  }
  removeTableVis(visList) {
    const attributes = JSON.parse(visList.attributes.visState);
    return attributes.type !== 'table';
  }

  removeAgentStatusVis(idArray) {
    const monitoringEnabled = this.portal9Config.getConfig()[
      'portal9.monitoring.enabled'
    ];
    if (!monitoringEnabled) {
      const visArray = idArray.filter(vis => {
        return vis !== 'Portal9-App-Overview-General-Agents-status';
      });
      return visArray;
    }
    return idArray;
  }

  async startVis2Png(tab, isAgents = false, syscollectorFilters = null) {
    try {
      if (this.vis2png.isWorking()) {
        ErrorHandler.handle('Report in progress', 'Reporting', { warning: true });
        return;
      }
      this.$rootScope.reportBusy = true;
      this.$rootScope.reportStatus = 'Generating report...0%';
      this.$rootScope.$applyAsync();

      this.vis2png.clear();

      const rawVisualizations = this.rawVisualizations
        .getList()
        .filter(this.removeTableVis);

      let idArray = [];
      if (tab === 'general') {
        idArray = this.removeAgentStatusVis(
          rawVisualizations.map(item => item.id)
        );
      } else {
        idArray = rawVisualizations.map(item => item.id);
      }

      for (const item of idArray) {
        const tmpHTMLElement = $(`#${item}`);
        this.vis2png.assignHTMLItem(item, tmpHTMLElement);
      }

      const appliedFilters = await this.visHandlers.getAppliedFilters(
        syscollectorFilters
      );

      const array = await this.vis2png.checkArray(idArray);
      const name = `portal9-${
        isAgents ? 'agents' : 'overview'
      }-${tab}-${(Date.now() / 1000) | 0}.pdf`;

      const browserTimezone = moment.tz.guess(true);

      const data = {
        array,
        name,
        title: isAgents ? `Agents ${tab}` : `Overview ${tab}`,
        filters: appliedFilters.filters,
        time: appliedFilters.time,
        searchBar: appliedFilters.searchBar,
        tables: appliedFilters.tables,
        tab,
        section: isAgents ? 'agents' : 'overview',
        isAgents,
        browserTimezone
      };

      await this.genericReq.request('POST', '/reports', data);

      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      this.$rootScope.$applyAsync();
      ErrorHandler.info(
        'Success. Go to Portal9 > Management > Reporting',
        'Reporting'
      );

      return;
    } catch (error) {
      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      ErrorHandler.handle(error.message || error);
    }
  }

  async startConfigReport(obj, type, components) {
    try {
      this.$rootScope.reportBusy = true;
      this.$rootScope.reportStatus = 'Generating PDF document...';
      this.$rootScope.$applyAsync();

      const docType =
        type === 'agentConfig'
          ? `portal9-agent-${obj.id}`
          : `portal9-group-${obj.name}`;

      const name = `${docType}-configuration-${(Date.now() / 1000) | 0}.pdf`;
      const browserTimezone = moment.tz.guess(true);

      const data = {
        array: [],
        name,
        filters: [
          type === 'agentConfig' ? { agent: obj.id } : { group: obj.name }
        ],
        time: '',
        searchBar: '',
        tables: [],
        tab: type,
        browserTimezone,
        components
      };

      await this.genericReq.request('POST', '/reports', data);

      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      this.$rootScope.$applyAsync();
      ErrorHandler.info(
        'Success. Go to Portal9 > Management > Reporting',
        'Reporting'
      );

      return;
    } catch (error) {
      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      ErrorHandler.handle(error.message || error);
      this.$rootScope.$applyAsync();
    }
  }
}
