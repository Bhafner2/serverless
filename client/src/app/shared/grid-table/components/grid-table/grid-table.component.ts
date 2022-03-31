import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { LoggerService } from '@smartfarming/common';
import { TranslocoService } from '@ngneat/transloco';
import {
  DateCellComponent,
  HealthCircleCellComponent,
  InlineMenuCellComponent,
  LinkButtonCellComponent,
  MlViewCellComponent,
  NumberWithIconCellComponent,
  NumberWithLiterCellComponent,
  TextWithSubtextCellComponent,
  TextCellComponent,
  FavouriteCellComponent,
  ActionCellComponent,
} from '../grid-framework';

import { Subscription } from 'rxjs';
import { ActionRowEvent, GridTableColumnDef, GridTableConfig } from '../../grid-table.types';
import { cloneDeep, findIndex, isEqual } from 'lodash';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridTableComponent<T> implements OnChanges, OnDestroy {
  @HostBinding('class')
  cssClass = 'app-grid-table';

  @ViewChild('agGrid') agGrid: AgGridAngular;

  @Input() data: T[];
  @Input() initSelectedData: T[];
  @Input() columnDefs: GridTableColumnDef[] = [];
  @Input() config: GridTableConfig = {};

  @Output() selectRows = new EventEmitter<T[]>();
  @Output() actionRow = new EventEmitter<ActionRowEvent<T>>();

  tableColumnDefs: GridTableColumnDef[] = [];
  globalSearchTerm = '';
  rowData: T[];
  initialized = false;

  translations = this.translocoService.getTranslation(this.translocoService.getActiveLang());
  private translocoSubscriber: Subscription;

  public gridApi: GridApi;
  frameworkComponents = {
    ActionCellComponent,
    TextWithSubtextCellComponent,
    NumberWithIconCellComponent,
    TextCellComponent,
    HealthCircleCellComponent,
    InlineMenuCellComponent,
    MlViewCellComponent,
    LinkButtonCellComponent,
    DateCellComponent,
    FavouriteCellComponent,
    NumberWithLiterCellComponent,
  };

  defaultColDef = {
    sortable: true,
    resizable: true,
    headerValueGetter: this.localizeHeader.bind(this),
    filter: 'agTextColumnFilter',
  };

  rowSelection = undefined;
  rowMultiSelectWithClick = false;
  suppressRowClickSelection = true;

  constructor(private logger: LoggerService, private translocoService: TranslocoService) {
    this.translocoSubscriber = this.translocoService.events$.subscribe(() => {
      this.gridApi?.refreshHeader();
    });
  }

  ngOnChanges(): void {
    this.processColumnDefs();
    if (this.gridApi) {
      this.setNewRowData();
    }
  }

  processColumnDefs(): void {
    this.tableColumnDefs = cloneDeep(this.columnDefs);
    if (this.config.allowSelection && this.config.allowSelection !== 'none') {
      if (this.config.allowSelection === 'single') {
        this.rowSelection = 'single';
      } else {
        this.rowSelection = 'multiple';
      }
      this.tableColumnDefs.unshift({
        width: 70,
        checkboxSelection: true,
      });
    }
    this.tableColumnDefs.forEach((tableColumnDef) => {
      if (!tableColumnDef.cellRendererParams) {
        tableColumnDef.cellRendererParams = {};
      }
      tableColumnDef.cellRendererParams.onActionTriggered = this.onActionTriggered.bind(this);
      if (!tableColumnDef.getQuickFilterText) {
        this.setQuickFilterTextForColumn(tableColumnDef);
      }
      if (!tableColumnDef.comparator) {
        this.setSortingComparatorForColumn(tableColumnDef);
      }
    });
  }
  setSortingComparatorForColumn(tableColumnDef: GridTableColumnDef): void {
    switch (tableColumnDef.cellRenderer) {
      case 'ActionCellComponent':
      case 'InlineMenuCellComponent':
      case 'LinkButtonCellComponent':
        tableColumnDef.sortable = false;
        break;
      case 'NumberWithIconCellComponent':
        tableColumnDef.comparator = function (valueA, valueB, nodeA, nodeB) {
          if (tableColumnDef.cellRendererParams.numberFn) {
            return (
              tableColumnDef.cellRendererParams.numberFn(nodeA) - tableColumnDef.cellRendererParams.numberFn(nodeB)
            );
          } else {
            const numberValueAttr = tableColumnDef.cellRendererParams.number;
            return nodeA.data[numberValueAttr] - nodeB.data[numberValueAttr];
          }
        }.bind(this);
        break;
      case 'DateCellComponent':
        tableColumnDef.comparator = function (valueA, valueB, nodeA, nodeB) {
          const dateA = tableColumnDef.cellRendererParams.dateFn
            ? tableColumnDef.cellRendererParams.dateFn(nodeA)
            : nodeA.data[tableColumnDef.cellRendererParams.date];

          const dateB = tableColumnDef.cellRendererParams.dateFn
            ? tableColumnDef.cellRendererParams.dateFn(nodeB)
            : nodeB.data[tableColumnDef.cellRendererParams.date];

          const dateATs = dateA ? new Date(dateA).valueOf() : 0;
          const dateBTs = dateB ? new Date(dateB).valueOf() : 0;
          return dateATs - dateBTs;
        }.bind(this);
        break;

      case 'TextCellComponent':
      case 'TextWithSubtextCellComponent':
        tableColumnDef.comparator = function (valueA, valueB, nodeA, nodeB) {
          const textA = this.getTranslatedOrSameOfParam(nodeA, tableColumnDef.cellRendererParams.text).trim();
          const textB = this.getTranslatedOrSameOfParam(nodeB, tableColumnDef.cellRendererParams.text).trim();
          if (textA === textB) {
            return 0;
          }
          return textA > textB ? 1 : -1;
        }.bind(this);
        break;
    }
  }
  setQuickFilterTextForColumn(tableColumnDef: GridTableColumnDef): void {
    switch (tableColumnDef.cellRenderer) {
      case 'TextCellComponent':
        tableColumnDef.getQuickFilterText = function (params) {
          return this.getTranslatedOrSameOfParam(params, tableColumnDef.cellRendererParams.text).trim();
        }.bind(this);
        break;
      case 'TextWithSubtextCellComponent':
        tableColumnDef.getQuickFilterText = function (params) {
          return (
            this.getTranslatedOrSameOfParam(params, tableColumnDef.cellRendererParams.text) +
            ' ' +
            this.getTranslatedOrSameOfParam(params, tableColumnDef.cellRendererParams.subText)
          ).trim();
        }.bind(this);
        break;
    }
  }
  getTranslatedOrSameOfParam(params: any, paramName: string): string {
    if (!params.data || params.data[paramName] === undefined || params.data[paramName] === null) {
      return '';
    }

    if (!(params.data[paramName] in this.translations)) {
      return params.data[paramName];
    }
    return this.translocoService.translate(params.data[paramName]);
  }

  setNewRowData(): void {
    this.gridApi.setRowData(this.data);
    if (!this.initialized && this.initSelectedData?.length) {
      const remainingInitSelectedData = cloneDeep(this.initSelectedData);
      this.gridApi.forEachNodeAfterFilter((node) => {
        const foundIndex = findIndex(remainingInitSelectedData, (row: T) => {
          return isEqual(node.data, row);
        });
        if (foundIndex >= 0) {
          node.setSelected(true);
          remainingInitSelectedData.splice(foundIndex, 1);
        }
      });
    }
    this.gridApi.sizeColumnsToFit();
    this.gridApi.refreshHeader();
    this.initialized = true;
  }
  ngOnDestroy(): void {
    this.translocoSubscriber.unsubscribe();
  }

  onGridReady(params: ICellRendererParams): void {
    this.gridApi = params.api;
    this.gridApi.setFloatingFiltersHeight(45);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    };
    if (this.data) {
      this.setNewRowData();
    }
  }

  localizeHeader(parameters: ICellRendererParams): string {
    const headerIdentifier = parameters.colDef.headerName;
    return this.translocoService.translate(headerIdentifier);
  }

  onChangeGlobalSearchTermEvent(): void {
    if (this.gridApi) {
      this.gridApi.setQuickFilter(this.globalSearchTerm);
    }
  }

  onSelectionChanged(event: any): void {
    const rows = event.api.getSelectedRows() || ([] as T[]);
    this.selectRows.emit(cloneDeep(rows));
  }
  onRowDataChanged(event: any): void {
    this.gridApi.sizeColumnsToFit();
  }

  onActionTriggered(actionId: string, row: T): void {
    this.actionRow.emit({
      actionId: actionId,
      row: cloneDeep(row),
    });
  }
  addEntryClick(): void {
    this.actionRow.emit({
      actionId: this.config.addNewEntry?.actionId || 'add',
      row: undefined,
    });
  }
}
