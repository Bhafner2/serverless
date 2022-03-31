import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-number-with-icon-cell',
  styleUrls: ['./number-with-icon-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <div class="text">{{ number | number: '1.0-0' }}</div>
    <div *ngIf="number && icon" class="{{ icon }} table-icon"></div>
    <object *ngIf="number && !icon" data="assets/img/cow.svg" class="table-icon" width="28" height="28"></object>
  </div>`,
})
export class NumberWithIconCellComponent implements ICellRenderer {
  number: number;
  icon: string;

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
    this.icon = params.icon;
  }

  getCallback(params: any): number | undefined {
    if (params?.numberFn) {
      return params.numberFn(params);
    } else if (params?.number) {
      return params.data[params.number];
    }
  }
}
