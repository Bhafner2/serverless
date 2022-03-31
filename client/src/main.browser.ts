/**
 * Angular bootstrapping
 */
import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/bootloader';
import get from 'lodash/get';

/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.useMockData) {
  console.log('Starting mock-server');

  /**
   * Mirage Mock Server
   */
  import('./mock.server').then((module) => {
    const mockServer = module.default;
    window['mirageServer'] = mockServer();
    // noinspection JSIgnoredPromiseFromCall
    initialize();
  });
}

if (environment.production) {
  enableProdMode();

  if (window.console) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.console.warn = () => {};
  }
}

/**
 * Bootstrap our Angular app with a top level NgModule
 */
const main = async (): Promise<NgModuleRef<AppModule>> => {
  const modulePromise: Promise<NgModuleRef<AppModule>> = platformBrowserDynamic().bootstrapModule(AppModule);
  return modulePromise.then(environment.decorateModuleRef);
};

/**
 * Bootstrap our Angular app
 */
async function initialize(): Promise<void> {
  if (!environment.production && get(module, 'hot')) {
    import('@ngxs/hmr-plugin').then((plugin) => {
      plugin.hmr(module, main).catch((err: Error) => console.error(err));
    });
  } else {
    bootloader(main);
  }
}

if (!environment.useMockData) {
  // noinspection JSIgnoredPromiseFromCall
  initialize();
}
