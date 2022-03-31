import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): any {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  imports: [
    TranslocoMessageFormatModule.init(),
    TranslocoLocaleModule.init({
      langToLocaleMapping: {
        de: 'de-CH',
        fr: 'fr-CH',
      },
    }),
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['de', 'fr', 'keys'],
        defaultLang: 'de',
        // Sets the fallback translation language for the currently active language in case of a missing key
        fallbackLang: 'de',
        missingHandler: {
          // Whether to use the fallback language for missing keys or values
          useFallbackTranslation: false,
          logMissingKey: true,
        },
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        // When enabled, Transloco will disable all console warnings
        prodMode: environment.production,
        // AOT translation file flatting, remove comments, minify json
        flatten: {
          aot: environment.production,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
