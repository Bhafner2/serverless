import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-text-with-subtext-cell',
  styleUrls: ['./text-with-subtext-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <div>
      <div *ngIf="text !== undefined" class="text">
        {{ text }}
      </div>
      <div *ngIf="subText !== undefined" class="sub-text">
        {{ subText }}
      </div>
    </div>
  </div>`,
})
export class TextWithSubtextCellComponent implements ICellRenderer {
  text?: string;
  subText?: string;

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
    this.subText = params.subText ? params?.data[params.subText] : undefined;
  }
}
