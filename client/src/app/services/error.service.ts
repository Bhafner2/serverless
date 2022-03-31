import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService as CommonErrorService } from '@smartfarming/common';

@Injectable({
  providedIn: 'root',
  deps: [Injector],
})
export class ErrorService extends CommonErrorService {
  constructor(protected injector: Injector) {
    super(injector);
  }

  showError(error: any): void {
    const toastrService = this.injector.get(ToastrService);
    if (error instanceof HttpErrorResponse) {
      // Server Error
      const message = ErrorService.getServerMessage(error);
      toastrService.error(`Error: ${message}`);
    } else if (error instanceof Error) {
      // Client Error
      const message = ErrorService.getClientMessage(error);
      toastrService.error(`Error: ${message}`);
    } else {
      toastrService.error(`Error: An unknown error happened. Please try again.`);
    }
  }

  /* istanbul ignore next */
  logAndShowError(error: any): void {
    this.logError(error);
    this.showError(error);
  }
}
