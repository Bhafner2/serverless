import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDialogService } from '../../shared';
import { ForageDto } from '../../gen';
import { forageTableColumnDefs, forageTableGridTableConfig } from './forage-table';
import { ActionRowEvent } from '../../shared/grid-table';
import {
  forageOnLocationTableColumnDefs,
  forageOnLocationTableConfig,
} from './forage-on-location-table/forage-on-location-table.definitions';
import { ForageService } from '../../services/forage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-forage',
  templateUrl: './forage.component.html',
  styleUrls: ['./forage.component.scss'],
})
export class ForageComponent implements OnInit, OnDestroy {
  forages: ForageDto[];
  foragesOnLocation: ForageDto[];

  forageOnLocationTableConfig = forageOnLocationTableConfig;
  forageOnLocationTableColumnDefs = forageOnLocationTableColumnDefs;
  destroy = new Subject<void>();

  constructor(private modalDialogService: ModalDialogService, private forageService: ForageService) {}

  ngOnInit(): void {
    this.forageService.forages$.pipe(takeUntil(this.destroy)).subscribe((forages) => {
      this.forages = forages;
    });
    this.forageService.foragesOnLocation$.pipe(takeUntil(this.destroy)).subscribe((forages) => {
      this.foragesOnLocation = forages;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  showTableModal(): void {
    this.modalDialogService.showTableDialog<ForageDto>(
      {
        title: 'dialog.selectForage.title',
        acceptLabel: 'dialog.button.save',
        cancelLabel: 'dialog.button.cancel',
        tableInfo: {
          data: this.forages,
          actionRowCallback: this.onActionEvent.bind(this),
          initSelectedData: this.foragesOnLocation,
          columnDefs: forageTableColumnDefs,
          config: forageTableGridTableConfig,
        },
      },
      (data: ForageDto[]) => {
        this.forageService.setForagesToLocation(data);
      },
      () => {
        //Modal closed with cancel
      }
    );
  }

  onActionEvent(actionEvent: ActionRowEvent<ForageDto>): void {
    console.log('ForageComponent onActionEvent', actionEvent);
  }

  onForageOnLocationActionRow(actionEvent: ActionRowEvent<ForageDto>): void {
    console.log('ForageComponent onForageOnLocationActionRow', actionEvent);
    if (actionEvent.actionId === 'add') {
      this.showTableModal();
    }
  }
}
