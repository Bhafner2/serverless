import { GridTableComponent } from './grid-table';
import {
  ActionCellComponent,
  DateCellComponent,
  FavouriteCellComponent,
  HealthCircleCellComponent,
  InlineMenuCellComponent,
  LinkButtonCellComponent,
  MlViewCellComponent,
  NumberWithIconCellComponent,
  NumberWithLiterCellComponent,
  TextCellComponent,
  TextWithSubtextCellComponent,
} from './grid-framework';

export * from './grid-framework';
export * from './grid-table';

export const gridTableExports = [
  ActionCellComponent,
  GridTableComponent,
  FavouriteCellComponent,
  DateCellComponent,
  HealthCircleCellComponent,
  InlineMenuCellComponent,
  LinkButtonCellComponent,
  MlViewCellComponent,
  NumberWithIconCellComponent,
  NumberWithLiterCellComponent,
  TextCellComponent,
  TextWithSubtextCellComponent,
];

export const gridTableDeclarations = [...gridTableExports];
