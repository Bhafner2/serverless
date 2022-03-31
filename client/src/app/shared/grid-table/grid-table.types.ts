export interface GridTableConfigGlobalSearch {
  showField?: boolean;
  title?: string;
  placeholder?: string;
}

export interface ActionRowEvent<U> {
  actionId: string;
  row?: U;
}

export interface GridTableAddNewEntry {
  actionId?: string; // default: 'add'
  buttonLabel: string;
  icon?: string; // default 'ico-circle_plus'
}
export interface GridTableRowsCountIndicator {
  showCount?: boolean;
  itemsLabel?: string;
}
export type GridTableColumnDef = any;
export type GridTableAllowSelection = 'none' | 'single' | 'multiple';

export interface GridTableConfig {
  title?: string;
  rowsCountIndicator?: GridTableRowsCountIndicator;
  globalSearch?: GridTableConfigGlobalSearch;
  allowSelection?: GridTableAllowSelection;
  addNewEntry?: GridTableAddNewEntry;
}
