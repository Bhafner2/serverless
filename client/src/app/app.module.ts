import { APP_BASE_HREF, PlatformLocation, registerLocaleData, VERSION } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, ɵivyEnabled } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import {
  CustomRouteReuseStrategy,
  getBaseHref,
  INTERCEPT_URLS,
  LanguageInterceptor,
  NocacheInterceptor,
} from '@smartfarming/common';
import { environment } from '../environments/environment';
import {
  API_PATH,
  API_REWRITE_EXCLUSIONS,
  API_REWRITE_INCLUSIONS,
  API_REWRITE_URL,
  APIInterceptor,
} from './interceptors/api.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslocoRootModule } from './shared/transloco/transloco-root.module';
import { TranslocoService } from '@ngneat/transloco';
import { StoreModule } from './store/store.module';
import { SharedModule } from './shared/shared.module';

// register locale for datepicker
import localeEn from '@angular/common/locales/en';
import localeEnCH from '@angular/common/locales/en-CH';
import localeDe from '@angular/common/locales/de';
import localeDeCH from '@angular/common/locales/de-CH';
import localeFr from '@angular/common/locales/fr';
import localeFrCH from '@angular/common/locales/fr-CH';
import localeIt from '@angular/common/locales/it';
import localeItCH from '@angular/common/locales/it-CH';
import { BsCoreModule } from '@biskin-kit/core';

const components = [];

/**
 * `AppModule` is the main entry point into Angular2's bootstrapping process.
 */
@NgModule({
  declarations: [AppComponent, ...components],

  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule,
    SharedModule.forRoot(),
    BsCoreModule.forRoot(),
    TranslocoRootModule,
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (localeService: TranslocoService) => {
        return localeService.getActiveLang();
      },
      deps: [TranslocoService],
    },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation],
    },
    { provide: API_PATH, useValue: '/rest' },
    {
      provide: API_REWRITE_URL,
      useValue: '/rest',
    },
    { provide: API_REWRITE_EXCLUSIONS, useValue: environment.useMockData ? ['/rest'] : [] },
    {
      provide: API_REWRITE_INCLUSIONS,
      useValue: [],
    },
    { provide: INTERCEPT_URLS, useValue: ['/rest'] },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true, deps: [LOCALE_ID, INTERCEPT_URLS] },
    { provide: HTTP_INTERCEPTORS, useClass: NocacheInterceptor, multi: true, deps: [INTERCEPT_URLS] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
      deps: [API_PATH, API_REWRITE_URL, API_REWRITE_EXCLUSIONS, API_REWRITE_INCLUSIONS],
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    environment.PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEn);
    registerLocaleData(localeEnCH);
    registerLocaleData(localeDe);
    registerLocaleData(localeDeCH);
    registerLocaleData(localeFr);
    registerLocaleData(localeFrCH);
    registerLocaleData(localeIt);
    registerLocaleData(localeItCH);
  }
}

if (!environment.production) {
  console.log(`Angular version = ${VERSION.major}.${VERSION.minor}`);
  // noinspection JSNonASCIINames
  console.log(`ivyEnabled = ${ɵivyEnabled}`);
  const isJit = Array.isArray(AppModule['__annotations__']);
  console.log(`isJit = ${isJit}`);
}
