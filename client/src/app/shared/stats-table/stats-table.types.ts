export interface StatsTableConfig {
  columns: number;
  header?: string;
  title?: string;
  comment?: string;
  isEditable?: boolean;
}

export interface StatsTableItem {
  title: string;
  value: string | number;
  unit?: string;
}
