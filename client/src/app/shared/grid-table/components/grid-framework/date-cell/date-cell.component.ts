import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';
import { format } from 'date-fns';

@Component({
  selector: 'app-date-cell',
  styleUrls: ['./date-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    {{ date }}
  </div>`,
})
export class DateCellComponent implements ICellRenderer {
  date: string;

  agInit(params: ICellRendererParams): void {
    this.setValue(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.setValue(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValue(params: any): void {
    this.date = this.getCallback(params);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getCallback(params: any): string | undefined {
    let dateValueUnformatted = undefined;
    if (params?.dateFn) {
      dateValueUnformatted = params.dateFn(params);
    } else if (params?.date) {
      dateValueUnformatted = params?.data[params.date];
    }
    if (dateValueUnformatted) {
      return format(new Date(dateValueUnformatted), 'dd.MM.yyyy');
    }
  }
}
