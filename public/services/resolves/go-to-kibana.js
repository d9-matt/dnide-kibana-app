/*
 * Portal9 app - Module to catch last url
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
// Manage leaving the app to another Kibana tab
export function goToKibana($location, $window) {
  const url = $location.$$absUrl.substring(0, $location.$$absUrl.indexOf('#'));
  const lastSubUrl = $window.sessionStorage.getItem(`lastSubUrl:${url}`) || '';
  if (
    lastSubUrl.includes('/portal9#/visualize') ||
    lastSubUrl.includes('/portal9#/doc') ||
    lastSubUrl.includes('/portal9#/context')
  ) {
    $window.sessionStorage.setItem(`lastSubUrl:${url}`, url);
  }

  $window.location.href = $location.absUrl().replace('/portal9#', '/kibana#');
}
