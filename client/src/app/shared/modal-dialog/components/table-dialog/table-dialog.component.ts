import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogAction, ModalDialogService } from '../..';
import { ActionRowEvent, GridTableColumnDef, GridTableConfig } from '../../../grid-table';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['../../styles/modal-dialog.scss', './table-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableDialogComponent<U> {
  @HostBinding('class')
  cssClass = 'app-table-dialog';

  acceptLabel = 'dialog.button.save';
  cancelLabel = 'dialog.button.cancel';
  title = '';

  data: U[];
  initSelectedData: U[] = [];
  columnDefs: GridTableColumnDef[];
  config?: GridTableConfig;

  currentSelectedRows: U[] = [];
  actionRowCallback?: (actionEvent: ActionRowEvent<U>) => void;

  constructor(public activeModal: NgbActiveModal, public modalDialogService: ModalDialogService) {}

  selectedRows(rows: U[]): void {
    this.currentSelectedRows = rows || [];
  }
  onActionRow(actionEvent: ActionRowEvent<U>): void {
    if (this.actionRowCallback) {
      this.actionRowCallback(actionEvent);
    }
  }

  actionSelected(actionId: ConfirmationDialogAction): void {
    this.modalDialogService.closeActiveDialogWithActionId(actionId, this.currentSelectedRows);
  }

  closeDialog(): void {
    this.modalDialogService.closeActiveDialog();
  }
}
