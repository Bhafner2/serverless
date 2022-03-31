import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent, LoadingDialogComponent, TableDialogComponent } from '../../components';
import {
  ConfirmationDialogAction,
  ConfirmationDialogOptions,
  LoadingDialogOptions,
  TableDialogOptions,
} from '../../modal-dialog.types';

@Injectable({ providedIn: 'root' })
export class ModalDialogService {
  currentDialogRef?: NgbModalRef;
  currentAcceptCallback?: (data) => void;
  currentCancelCallback?: () => void;
  constructor(private modalService: NgbModal) {}

  showTableDialog<U>(
    tableDialogOptions: TableDialogOptions<U>,
    acceptCallback?: (data?: U[]) => void,
    cancelCallback?: () => void
  ): void {
    this.modalService.dismissAll();
    this.currentDialogRef = this.modalService.open(TableDialogComponent, {
      windowClass: 'app-modal-dialog app-modal-dialog--with-table ',
      backdropClass: 'app-modal-backdrop',
      centered: true,
      backdrop: 'static',
      size: 'xl',
    });
    const componentInstance = this.currentDialogRef?.componentInstance as TableDialogComponent<U>;
    if (componentInstance) {
      componentInstance.data = tableDialogOptions.tableInfo.data;
      componentInstance.initSelectedData = tableDialogOptions.tableInfo.initSelectedData || [];
      componentInstance.columnDefs = tableDialogOptions.tableInfo.columnDefs;
      componentInstance.config = tableDialogOptions.tableInfo.config || {};
      componentInstance.actionRowCallback = tableDialogOptions.tableInfo.actionRowCallback;

      componentInstance.title = tableDialogOptions.title || '';
      componentInstance.acceptLabel = tableDialogOptions.acceptLabel || 'dialog.button.accept';
      componentInstance.cancelLabel = tableDialogOptions.cancelLabel || 'dialog.button.cancel';
    }

    this.currentAcceptCallback = acceptCallback;
    this.currentCancelCallback = cancelCallback;
  }
  // eslint-disable-next-line
  showTableComponentDialog<U>(component: any, acceptCallback?: (data?: U) => void, cancelCallback?: () => void): void {
    this.modalService.dismissAll();
    this.currentDialogRef = this.modalService.open(component, {
      windowClass: 'app-modal-dialog app-modal-dialog--with-table ',
      backdropClass: 'app-modal-backdrop',
      centered: true,
      backdrop: 'static',
      size: 'xl',
    });
    this.currentAcceptCallback = acceptCallback;
    this.currentCancelCallback = cancelCallback;
  }

  // eslint-disable-next-line
  showComponentDialog<U>(component: any, acceptCallback?: (data?: U) => void, cancelCallback?: () => void): void {
    this.modalService.dismissAll();
    this.currentDialogRef = this.modalService.open(component, {
      windowClass: 'app-modal-dialog',
      backdropClass: 'app-modal-backdrop',
      centered: true,
      backdrop: 'static',
    });
    this.currentAcceptCallback = acceptCallback;
    this.currentCancelCallback = cancelCallback;
  }

  showConfirmationDialog(
    confirmationDialogOptions: ConfirmationDialogOptions,
    acceptCallback?: () => void,
    cancelCallback?: () => void
  ): void {
    this.modalService.dismissAll();
    this.currentDialogRef = this.modalService.open(ConfirmationDialogComponent, {
      windowClass: 'app-modal-dialog',
      backdropClass: 'app-modal-backdrop',
      centered: true,
      backdrop: 'static',
      size: 'md',
    });
    this.currentAcceptCallback = acceptCallback;
    this.currentCancelCallback = cancelCallback;

    const componentInstance = this.currentDialogRef?.componentInstance as ConfirmationDialogComponent;
    if (componentInstance) {
      componentInstance.title = confirmationDialogOptions.title || '';
      componentInstance.bodyText = confirmationDialogOptions.bodyText || '';
      componentInstance.acceptLabel = confirmationDialogOptions.acceptLabel || 'dialog.button.accept';
      componentInstance.cancelLabel = confirmationDialogOptions.cancelLabel || 'dialog.button.cancel';
    }
  }

  async showLoadingDialog<T>(loadingDialogOptions: LoadingDialogOptions, loadingPromise?: Promise<T>): Promise<T> {
    this.modalService.dismissAll();
    this.currentDialogRef = this.modalService.open(LoadingDialogComponent, {
      windowClass: 'app-modal-dialog',
      backdropClass: 'app-modal-backdrop',
      centered: true,
      backdrop: 'static',
      size: 'md',
    });
    this.currentAcceptCallback = undefined;
    this.currentCancelCallback = undefined;

    const componentInstance = this.currentDialogRef?.componentInstance as LoadingDialogComponent;
    if (componentInstance) {
      componentInstance.title = loadingDialogOptions.title || 'dialog.loading.pleaseWait';
      componentInstance.bodyText = loadingDialogOptions.bodyText || 'dialog.loading.requestBeingProcessed';

      if (loadingPromise) {
        const result: T = await loadingPromise;
        this.closeActiveDialog();
        return result;
      }
    }
  }

  closeActiveDialog(): void {
    this.modalService.dismissAll();
  }

  closeActiveDialogWithActionId<T>(actionId: ConfirmationDialogAction, data?: T): void {
    this.modalService.dismissAll();
    if (actionId === 'accept' && this.currentAcceptCallback) {
      this.currentAcceptCallback(data);
    } else if (this.currentCancelCallback) {
      this.currentCancelCallback();
    }
  }
}
