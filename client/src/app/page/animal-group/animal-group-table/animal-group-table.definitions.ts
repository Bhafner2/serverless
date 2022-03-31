import { GridTableConfig } from '../../../shared/grid-table';
import { ICellRendererParams } from 'ag-grid-community';
import { getLatestCalvingBirthdate, getLatestMlp } from '../../../services/animal-helper.service';

export const animalGroupTableConfig: GridTableConfig = {
  title: 'overview',
  rowsCountIndicator: {
    showCount: true,
    itemsLabel: 'animal',
  },
  addNewEntry: {
    actionId: 'add',
    buttonLabel: 'animal.add',
  },
};
export const animalGroupTableColumnDefs = [
  {
    cellRenderer: 'HealthCircleCellComponent',
    width: 110,
  },
  {
    headerName: 'name',
    cellRenderer: 'TextWithSubtextCellComponent',
    cellRendererParams: {
      text: 'name',
      subText: 'tvdNr',
    },
    width: 300,
  },
  {
    headerName: 'animal.ml',
    cellRenderer: 'MlViewCellComponent',
  },
  {
    headerName: 'animal.ltg',
    cellRenderer: 'NumberWithIconCellComponent',
    cellRendererParams: {
      numberFn: (params: ICellRendererParams): number => getLatestMlp(params)?.fett,
      icon: 'ico-calendar',
    },
  },
  {
    headerName: 'animal.lnr',
    cellRenderer: 'NumberWithIconCellComponent',
    cellRendererParams: {
      numberFn: (params: ICellRendererParams): number => getLatestMlp(params)?.fett,
      icon: 'ico-reload',
    },
  },
  {
    headerName: 'animal.kd',
    cellRenderer: 'DateCellComponent',
    cellRendererParams: {
      dateFn: (params: ICellRendererParams): string => getLatestCalvingBirthdate(params),
    },
  },
  {
    cellRenderer: 'LinkButtonCellComponent',
    cellRendererParams: {
      link: '',
      text: 'detail',
    },
  },
  {
    cellRenderer: 'InlineMenuCellComponent',
    cellRendererParams: {
      link: '',
    },
    width: 70,
  },
];
