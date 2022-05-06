import { PluginInitializerContext } from 'kibana/server';

import { Portal9Plugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new Portal9Plugin(initializerContext);
}

export { Portal9PluginSetup, Portal9PluginStart } from './types';
