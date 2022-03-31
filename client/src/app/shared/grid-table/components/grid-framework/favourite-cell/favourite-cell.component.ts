import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-favourite-cell',
  styleUrls: ['./favourite-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <div *ngIf="isFavourite" class="ico-star"></div>
    <div *ngIf="!isFavourite" class="ico-star_outline"></div>
  </div>`,
})
export class FavouriteCellComponent implements ICellRenderer {
  isFavourite?: boolean;

  agInit(params: ICellRendererParams): void {
    this.setValues(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.setValues(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValues(params: any): void {
    this.isFavourite = params.isFavourite ? params?.data[params.isFavourite] : undefined;
  }
}
