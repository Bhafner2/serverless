import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-inline-menu-cell',
  styleUrls: ['./inline-menu-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block frame">
    <div class="ico-angle_left_double arrow"></div>
  </div>`,
})
export class InlineMenuCellComponent implements ICellRenderer {
  text: string;
  subText: string;

  agInit(params: ICellRendererParams): void {
    this.setValues(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.setValues(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValues(params: any): void {
    this.text = params?.data[params.text];
    this.subText = params?.data[params.subText];
  }
}
