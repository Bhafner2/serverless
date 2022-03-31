import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { ErrorHandler as CommonErrorHandler } from '@smartfarming/common';

@Injectable({
  providedIn: 'any',
})
export class ErrorHandler extends CommonErrorHandler {
  /* istanbul ignore function */
  handleError(error: any): void {
    const errorService = this.injector.get(ErrorService);
    errorService.logAndShowError(error);
  }
}
