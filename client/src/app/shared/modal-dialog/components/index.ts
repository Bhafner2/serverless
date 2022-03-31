import { ConfirmationDialogComponent } from './confirmation-dialog';
import { LoadingDialogComponent } from './loading-dialog';
import { TableDialogComponent } from './table-dialog';

export * from './confirmation-dialog';
export * from './loading-dialog';
export * from './table-dialog';

export const modalDialogExports = [ConfirmationDialogComponent, LoadingDialogComponent, TableDialogComponent];

export const modalDialogDeclarations = [...modalDialogExports];
