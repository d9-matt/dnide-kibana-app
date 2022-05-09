/*
 * Portal9 app - Add the plugin help links as extension in Kibana help menu
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React from 'react';
import {
  EuiIcon,
} from '@elastic/eui';
import { version } from '../../package.json';
import { getChrome, getHttp} from '../kibana-services';
import { 
  PORTAL9_LINK_DOCUMENTATION,
  PORTAL9_LINK_GITHUB,
  PORTAL9_LINK_GOOGLE_GROUPS,
  PORTAL9_LINK_SLACK
} from '../../common/constants';

const appVersionMajorDotMinor = version.split('.').slice(0, 2).join('.');

export function addHelpMenuToAppChrome(){
  getChrome().setHelpExtension({
    appName: 'Portal9 support',
    links: [
      {
        linkType: 'custom',
        href: `${PORTAL9_LINK_DOCUMENTATION}/${appVersionMajorDotMinor}`,
        content: <span><EuiIcon type={getHttp().basePath.prepend('/plugins/portal9/assets/icon_blue.svg')}></EuiIcon> Documentation</span>
      },
      {
        linkType: 'custom',
        href: PORTAL9_LINK_SLACK,
        content: <span><EuiIcon type='logoSlack'></EuiIcon> Slack channel</span>
      },
      {
        linkType: 'custom',
        href: PORTAL9_LINK_GITHUB,
        content: <span><EuiIcon type='logoGithub'></EuiIcon> Projects on Github</span>
      },
      {
        linkType: 'custom',
        href: PORTAL9_LINK_GOOGLE_GROUPS,
        content: <span><EuiIcon type={getHttp().basePath.prepend('/plugins/portal9/assets/icon_google_groups.svg')}></EuiIcon> Google Group</span>
      }
    ]
  });
}
