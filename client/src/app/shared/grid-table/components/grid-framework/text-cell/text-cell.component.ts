import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-text-cell',
  styleUrls: ['./text-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <div>
      <div *ngIf="text !== undefined" class="text">
        {{ text | transloco }}
      </div>
    </div>
  </div>`,
})
export class TextCellComponent implements ICellRenderer {
  text?: string;

  agInit(params: ICellRendererParams): void {
    this.setValues(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.setValues(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValues(params: any): void {
    this.text = params.text ? params?.data[params.text] : undefined;
  }
}
