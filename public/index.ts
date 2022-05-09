import { PluginInitializer, PluginInitializerContext } from 'kibana/public';
import { Portal9Plugin } from './plugin';
import { Portal9Setup, Portal9SetupPlugins, Portal9Start, Portal9StartPlugins } from './types';

export const plugin: PluginInitializer<Portal9Setup, Portal9Start, Portal9SetupPlugins, Portal9StartPlugins> = (
  initializerContext: PluginInitializerContext
) => {
  return new Portal9Plugin(initializerContext);
};

// These are your public types & static code
export { Portal9Setup, Portal9Start };
