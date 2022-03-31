import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-number-with-liter-cell',
  styleUrls: ['./number-with-liter-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <div class="text">{{ number | number: '1.0-0' }} <span class="text">l</span></div>
  </div>`,
})
export class NumberWithLiterCellComponent implements ICellRenderer {
  number: number;

  agInit(params: ICellRendererParams): void {
    this.setValues(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.setValues(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValues(params: any): void {
    this.number = this.getCallback(params);
  }

  getCallback(params: any): number | undefined {
    if (params?.numberFn) {
      return params.numberFn(params);
    } else if (params?.number) {
      return params.data[params.number];
    }
  }
}
