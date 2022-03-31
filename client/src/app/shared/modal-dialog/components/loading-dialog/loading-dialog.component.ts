import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['../../styles/modal-dialog.scss', './loading-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingDialogComponent {
  @HostBinding('class')
  readonly cssClass = 'app-loading-dialog';

  title = 'dialog.loading.pleaseWait';
  bodyText = 'dialog.loading.requestBeingProcessed';
}
