import { Configuration } from 'webpack';
import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';

/**
 * This is where you define a function that modifies your webpack config
 */
export default (cfg: Configuration, opts: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {
  /**
   * adding inline=true to webpack-dev-server (recommended for HMR)
   * fixes the broken hmr in angular 9.1+
   * https://webpack.js.org/configuration/dev-server/#devserverinline
   */
  if ((cfg as any).devServer) {
    (cfg as any).devServer.inline = true;
  }

  return cfg;
};
