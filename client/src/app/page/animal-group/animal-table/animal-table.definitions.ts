import { GridTableConfig } from '../../../shared/grid-table';
import { ICellRendererParams } from 'ag-grid-community';
import { getLatestCalving, getLatestMlp } from '../../../services/animal-helper.service';

export const animalTableGridTableConfig: GridTableConfig = {
  globalSearch: {
    showField: true,
    title: 'animal.all-my-animals',
    placeholder: 'animal.search',
  },
  allowSelection: 'multiple',
};

export const animalTableColumnDefs = [
  {
    headerName: 'name',
    cellRenderer: 'TextWithSubtextCellComponent',
    cellRendererParams: {
      text: 'name',
      subText: 'tvdNr',
    },
  },
  {
    headerName: 'animal.ml',
    cellRenderer: 'NumberWithLiterCellComponent',
    cellRendererParams: {
      numberFn: (params: ICellRendererParams): number =>
        getLatestMlp(params)?.milchMorgen + getLatestMlp(params)?.milchAbend,
    },
  },
  {
    headerName: 'animal.has',
    cellRenderer: 'NumberWithLiterCellComponent',
    cellRendererParams: {
      numberFn: (params: ICellRendererParams): number => getLatestMlp(params)?.harnstoff,
    },
  },
  {
    headerName: 'animal.ltg',
    cellRenderer: 'NumberWithIconCellComponent',
    cellRendererParams: {
      numberFn: (params: ICellRendererParams): number => getLatestMlp(params)?.laktoseTage,
      icon: 'ico-calendar',
    },
  },
  {
    headerName: 'animal.lnr',
    cellRenderer: 'NumberWithIconCellComponent',
    cellRendererParams: {
      numberFn: (params: ICellRendererParams): number => getLatestCalving(params)?.lactoseNo,
      icon: 'ico-reload',
    },
  },
  {
    headerName: 'animal.breed',
    field: 'animalBreed.name',
  },
  {
    headerName: 'animal-group',
    field: 'animalGroup.name',
  },
];
