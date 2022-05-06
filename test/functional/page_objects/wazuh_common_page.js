/*
 * Portal9 app
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

export function Portal9CommonProvider({ getService, getPageObjects }) {
  const appsMenu = getService('appsMenu');
  const log = getService('log');
  const PageObjects = getPageObjects(['common', 'timePicker']);
  const testSubjects = getService('testSubjects');

  /**
   * Special functions needed in the tests.
   *
   * @class Portal9CommonPage
   */
  class Portal9CommonPage {
    /**
     * Navigate to `Security events` without the timestamp parameter in the URL
     *
     * @memberof Portal9CommonPage
     */
    async OpenSecurityEvents() {
      log.debug('Open Security events');
      await PageObjects.common.navigateToApp('settings');
      await appsMenu.clickLink('Portal9');
      await appsMenu.clickLink('Portal9');
      await testSubjects.click('overviewWelcomeGeneral');
    }

    /**
     * Navigate to `Integrity monitoring` without the timestamp parameter in the URL
     *
     * @memberof Portal9CommonPage
     */
    async OpenIntegrityMonitoring() {
      log.debug('Open Security events');
      await PageObjects.common.navigateToApp('settings');
      await appsMenu.clickLink('Portal9');
      await appsMenu.clickLink('Portal9');
      await testSubjects.click('overviewWelcomeFim');
    }

    /**
     * Select `today` in the commonly used times
     *
     * @memberof Portal9CommonPage
     */
    async setTodayRange() {
      log.debug('Set today in the time range picker');
      await PageObjects.timePicker.setCommonlyUsedTime(
        'superDatePickerCommonlyUsed_Today'
      );
      await PageObjects.common.sleep(3000);
      await testSubjects.click('querySubmitButton');
      await PageObjects.common.sleep(3000);
    }
  }
  return new Portal9CommonPage();
}
