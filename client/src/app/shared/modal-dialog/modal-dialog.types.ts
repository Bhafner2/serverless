import { ActionRowEvent, GridTableColumnDef, GridTableConfig } from '../grid-table';

export type ConfirmationDialogAction = 'accept' | 'cancel';
export type TypeaheadDialogAction = 'accept' | 'cancel';

export interface TableDialogTableInfo<U> {
  columnDefs: GridTableColumnDef[];
  config?: GridTableConfig;
  data: U[];
  initSelectedData?: U[];
  actionRowCallback?: (action: ActionRowEvent<U>) => void;
}
export interface TableDialogOptions<U> {
  title: string;
  acceptLabel?: string;
  cancelLabel?: string;
  tableInfo: TableDialogTableInfo<U>;
}
export interface ConfirmationDialogOptions {
  title: string;
  bodyText: string;
  acceptLabel?: string;
  cancelLabel?: string;
}

export interface LoadingDialogOptions {
  title?: string;
  bodyText?: string;
}
