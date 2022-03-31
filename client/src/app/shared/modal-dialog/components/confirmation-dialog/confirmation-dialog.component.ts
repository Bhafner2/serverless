import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { ModalDialogService } from '../../services';
import { ConfirmationDialogAction } from '../../modal-dialog.types';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['../../styles/modal-dialog.scss', './confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationDialogComponent {
  @HostBinding('class')
  readonly cssClass = 'app-confirmation-dialog';

  title: string;
  bodyText: string;
  acceptLabel: string;
  cancelLabel: string;
  constructor(private modalDialogService: ModalDialogService) {}

  closeDialog(): void {
    this.modalDialogService.closeActiveDialog();
  }
  actionSelected(actionId: ConfirmationDialogAction): void {
    this.modalDialogService.closeActiveDialogWithActionId(actionId);
  }
}
