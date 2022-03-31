import { GridTableConfig } from '../../../shared/grid-table';

export const forageTableGridTableConfig: GridTableConfig = {
  globalSearch: {
    showField: true,
    title: 'dialog.selectForage.searchTitle',
    placeholder: 'dialog.selectForage.searchPlaceholder',
  },
  allowSelection: 'multiple',
};

export const forageTableColumnDefs = [
  {
    headerName: 'name',
    cellRenderer: 'TextWithSubtextCellComponent',
    cellRendererParams: {
      text: 'name',
      subText: 'producerName',
    },
    width: 300,
  },
  // {
  //   headerName: 'table.column.favourite',
  //   cellRenderer: 'FavouriteCellComponent',
  //   cellRendererParams: {
  //     isFavourite: 'id',
  //   },
  //   width: 100,
  // },
  {
    headerName: 'table.column.forage',
    cellRenderer: 'TextCellComponent',
    cellRendererParams: {
      text: 'forageType',
    },
    width: 300,
  },
  {
    cellRenderer: 'ActionCellComponent',
    cellRendererParams: {
      actionId: 'detail',
      actionLabel: 'detail',
    },
    width: 120,
  },
];
