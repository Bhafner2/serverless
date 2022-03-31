import { GridTableConfig } from '../../../shared/grid-table';

export const forageOnLocationTableConfig: GridTableConfig = {
  title: 'table.forageOnLocation.title',
  addNewEntry: {
    actionId: 'add',
    buttonLabel: 'button.addForage.label',
  },
};
export const forageOnLocationTableColumnDefs = [
  {
    headerName: 'name',
    cellRenderer: 'TextWithSubtextCellComponent',
    cellRendererParams: {
      text: 'name',
      subText: 'producerName',
    },
  },
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
