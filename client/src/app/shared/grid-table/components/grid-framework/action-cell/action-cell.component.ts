import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-cell',
  styleUrls: ['../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <button (click)="actionClick()" class="btn btn-outline-primary btn-round">{{ actionLabel | transloco }}</button>
  </div>`,
})
export class ActionCellComponent implements ICellRenderer {
  actionId: string;
  actionLabel: string;
  actionCallback: (actionId: string, row: any) => void;
  row: any;

  agInit(params: ICellRendererParams): void {
    this.setValues(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.setValues(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValues(params: any): void {
    this.actionId = params.actionId;
    this.actionLabel = params.actionLabel;
    this.actionCallback = params?.onActionTriggered;
    this.row = params.data;
  }
  actionClick(): void {
    this.actionCallback(this.actionId, this.row);
  }
}
