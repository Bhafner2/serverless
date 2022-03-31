import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-ml-view-cell',
  styleUrls: ['./ml-view-cell.component.scss', '../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <div class="ml">{{ ml | number: '1.1-1' }} <span class="ml">l</span></div>
    <div class="ml-detail">
      <div>{{ info1 | number: '1.1-1' }}</div>
      <div>{{ info2 | number: '1.1-1' }}</div>
    </div>
  </div>`,
})
export class MlViewCellComponent implements ICellRenderer {
  ml: number;
  info1: number;
  info2: number;

  agInit(params: ICellRendererParams): void {
    this.setValues(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.setValues(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValues(params: any): void {
    let mlp;
    const mpd = params?.data?.milkPerformanceData;
    if (mpd && mpd.length > 0) {
      mlp = sortBy(mpd, (c) => c.date)[0];
    }

    this.ml = mlp?.milchMorgen + mlp?.milchAbend;
    this.info1 = +mlp?.milchMorgen;
    this.info2 = +mlp?.milchAbend;
  }
}
