import { Component } from '@angular/core';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

export type LinkButtonCellRenderer = ICellRendererParams & {
  id: string;
  link: string;
  text: string;
};

@Component({
  selector: 'app-link-button-cell',
  styleUrls: ['../../../styles/grid-table.scss'],
  template: ` <div class="text-block">
    <a routerLink="/{{ link }}" type="button" class="btn btn-outline-primary btn-round">{{ text | transloco }}</a>
  </div>`,
})
export class LinkButtonCellComponent implements ICellRenderer {
  link: string;
  text: string;

  agInit(params: LinkButtonCellRenderer): void {
    this.setValues(params);
  }

  refresh(params: LinkButtonCellRenderer): boolean {
    this.setValues(params);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValues(params: LinkButtonCellRenderer): void {
    this.link = params['link'];
    const id = params?.data[params.id];
    if (id) {
      this.link = this.link + '/' + id;
    }

    if (params.text) {
      this.text = params.text;
    }
  }
}
