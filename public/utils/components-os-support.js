/*
 * Portal9 app - Components compatibility operative system
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { PORTAL9_AGENTS_OS_TYPE, PORTAL9_MODULES_ID } from '../../common/constants';

export const UnsupportedComponents = {
  [PORTAL9_AGENTS_OS_TYPE.LINUX]: [],
  [PORTAL9_AGENTS_OS_TYPE.WINDOWS]: [PORTAL9_MODULES_ID.AUDITING, PORTAL9_MODULES_ID.DOCKER, PORTAL9_MODULES_ID.OPEN_SCAP],
  [PORTAL9_AGENTS_OS_TYPE.DARWIN]: [PORTAL9_MODULES_ID.AUDITING, PORTAL9_MODULES_ID.DOCKER, PORTAL9_MODULES_ID.OPEN_SCAP],
  [PORTAL9_AGENTS_OS_TYPE.SUNOS]: [PORTAL9_MODULES_ID.VULNERABILITIES],
  [PORTAL9_AGENTS_OS_TYPE.OTHERS]: [PORTAL9_MODULES_ID.AUDITING, PORTAL9_MODULES_ID.DOCKER, PORTAL9_MODULES_ID.OPEN_SCAP, PORTAL9_MODULES_ID.VULNERABILITIES]
};
