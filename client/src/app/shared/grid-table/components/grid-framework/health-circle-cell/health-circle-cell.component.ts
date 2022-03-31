import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-health-circle-cell',
  styleUrls: ['./health-circle-cell.component.scss', '../../../styles/grid-table.scss'],
  template: `<div class="text-block"><div class="circle"></div></div>`,
})
export class HealthCircleCellComponent implements ICellRenderer {
  agInit(params: ICellRendererParams): void {
    //empty
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
}
