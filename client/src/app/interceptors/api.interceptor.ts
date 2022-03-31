import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import isEmpty from 'lodash/isEmpty';

export const API_PATH = new InjectionToken<string>('');
export const API_REWRITE_URL = new InjectionToken<string>('');
export const API_REWRITE_EXCLUSIONS = new InjectionToken<string>('');
export const API_REWRITE_INCLUSIONS = new InjectionToken<string>('');

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_PATH) private apiPath: string,
    @Inject(API_REWRITE_URL) private rewriteURL: string,
    @Optional() @Inject(API_REWRITE_EXCLUSIONS) private readonly URLS: string[],
    @Optional() @Inject(API_REWRITE_INCLUSIONS) private readonly INCLUDE_URLS: string[]
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url.toLowerCase();

    if (
      !isEmpty(this.rewriteURL) &&
      ((url.startsWith(this.apiPath) && !this.excludeUrl(url)) || this.interceptUrl(url))
    ) {
      const requestOptions: any = {
        url: `${this.rewriteURL}${request.url.split(this.apiPath).pop().charAt(0) != '/' ? '/' : ''}${request.url
          .split(this.apiPath)
          .pop()}`,
      };

      const apiReq = request.clone(requestOptions);
      return next.handle(apiReq);
    }

    return next.handle(request);
  }

  /**
   * Returns true if the url to test matches those supplied in the injection-token
   */
  private excludeUrl(url: string): boolean {
    if (this.URLS && !isEmpty(this.URLS)) {
      return !isEmpty(this.URLS.find((u) => url.startsWith(u))) || false;
    }

    return false;
  }

  /**
   * Returns true if the url to test matches those supplied in the injection-token
   */
  private interceptUrl(url: string): boolean {
    if (this.INCLUDE_URLS && !isEmpty(this.INCLUDE_URLS)) {
      return !isEmpty(this.INCLUDE_URLS.find((u) => url.startsWith(u))) || false;
    }

    return false;
  }
}
