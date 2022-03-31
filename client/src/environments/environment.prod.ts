import { NgModuleRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Environment } from './environment.model';

// Make Zone.js give a more reasonable behavior when used with RxJS
// import 'zone.js/dist/zone-patch-rxjs';

export const environment: Environment = {
  production: true,
  useMockData: false,
  PROVIDERS: [],

  /**
   * Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   */
  decorateModuleRef(modRef: NgModuleRef<any>) {
    disableDebugTools();
    return modRef;
  },
};
