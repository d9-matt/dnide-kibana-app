/*
 * Portal9 app - Pattern Handler service
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import store from "../redux/store";
import { updateAppConfig } from "../redux/actions/appConfigActions";

export class Portal9Config {
  constructor() {
    if (!!Portal9Config.instance) {
      return Portal9Config.instance;
    }
    Portal9Config.instance = this;


    return this;
  }

  /**
   * Set given configuration
   * @param {Object} cfg
   */
  setConfig(cfg) {
    store.dispatch(updateAppConfig({...cfg}));
  }

  /**
   * Get configuration
   */
  getConfig() {
    return store.getState().appConfig.data;
  }

  /**
   * Returns true if debug level is enabled, otherwise it returns false.
   */
  isDebug() {
    return ((this.getConfig() || {})['logs.level'] || false) === 'debug';
  }
}
