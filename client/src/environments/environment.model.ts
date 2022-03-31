import { NgModuleRef } from '@angular/core';

export interface Environment {
  production: boolean;
  useMockData: boolean;
  PROVIDERS: any[];

  decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
}
