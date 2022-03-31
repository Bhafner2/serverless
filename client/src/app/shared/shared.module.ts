import { ModuleWithProviders, NgModule } from '@angular/core';
import { EllipsifyMeDirective } from './util';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { BsAgGridModule } from '@biskin-kit/ag-grid';
import { statsTableDeclarations, statsTableExports } from './stats-table';
import { modalDialogDeclarations, modalDialogExports, modalDialogProviders } from './modal-dialog';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { gridTableDeclarations, gridTableExports } from './grid-table';

@NgModule({
  declarations: [
    EllipsifyMeDirective,
    NavigationComponent,
    ...gridTableDeclarations,
    ...modalDialogDeclarations,
    ...statsTableDeclarations,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EllipsifyMeDirective,
    TranslocoModule,
    NavigationComponent,
    BsAgGridModule,
    ...gridTableExports,
    ...modalDialogExports,
    ...statsTableExports,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoLocaleModule,
    BsAgGridModule.forRoot(),
    NgbModalModule,
  ],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [...modalDialogProviders],
    };
  }
}
