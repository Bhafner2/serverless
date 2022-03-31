import { GridTableConfig } from '../../../shared/grid-table';
import { ICellRendererParams } from 'ag-grid-community';

export const animalGroupsTableConfig: GridTableConfig = {
  title: 'my-animal-groups',
  addNewEntry: {
    actionId: 'add',
    buttonLabel: 'animal-group.add',
  },
};
export const animalGroupsTableColumnDefs = [
  {
    headerName: 'animal-group',
    cellRenderer: 'TextWithSubtextCellComponent',
    cellRendererParams: {
      text: 'name',
      subText: 'comment',
    },
    width: 400,
  },
  {
    headerName: 'animal.amount',
    cellRenderer: 'NumberWithIconCellComponent',
    cellRendererParams: {
      numberFn: (params: ICellRendererParams): number => params.data?.animals?.length,
    },
  },
  {
    headerName: 'amount',
    cellRenderer: 'NumberWithIconCellComponent',
    cellRendererParams: {
      number: '', //TODO kommt später
      icon: 'ico-nav_frontservice',
    },
  },
  {
    headerName: 'futterplan',
    cellRenderer: 'LinkButtonCellComponent',
    cellRendererParams: {
      link: '',
      text: 'pdf',
    },
  },
  {
    cellRenderer: 'LinkButtonCellComponent',
    cellRendererParams: {
      link: 'animal-group',
      id: 'id',
      text: 'edit',
    },
  },
];
