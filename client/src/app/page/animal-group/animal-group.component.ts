import { StatsTableItem, ModalDialogService } from '../../shared';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalGroupService } from '../../services/animal-group.service';
import { LoggerService } from '@smartfarming/common';
import { AnimalDto, AnimalGroupDto } from '../../gen';
import { animalTableColumnDefs, animalTableGridTableConfig } from './animal-table';
import { AnimalService } from '../../services/animal.service';
import { ActionRowEvent } from '../../shared/grid-table';
import { animalGroupTableColumnDefs, animalGroupTableConfig } from './animal-group-table';
import { cloneDeep } from 'lodash';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-animal-group',
  templateUrl: './animal-group.component.html',
  styleUrls: ['./animal-group.component.scss'],
})
export class AnimalGroupComponent implements OnInit, OnDestroy {
  animalGroup: AnimalGroupDto;
  animalGroupAnimals: AnimalDto[];
  animals: AnimalDto[];

  animalGroupTableColumnDefs = animalGroupTableColumnDefs;
  animalGroupTableConfig = animalGroupTableConfig;

  destroy = new Subject<void>();
  animalStats: StatsTableItem[] = [
    {
      title: 'animal.stats.Milchleistung',
      value: 41.9,
      unit: 'unit.kg/Tg',
    },
    {
      title: 'animal.stats.Milchfett',
      value: 4.7,
      unit: 'unit.percentage',
    },
    {
      title: 'animal.stats.Milcheiweissgehalt',
      value: 4.7,
      unit: 'unit.percentage',
    },
    {
      title: 'animal.stats.Gewicht',
      value: 4.7,
      unit: 'unit.kg',
    },
    {
      title: 'animal.stats.Milchlaktose',
      value: 4.64,
      unit: 'unit.percentage',
    },
    {
      title: 'animal.stats.Harnstoffgehalt',
      value: 23,
      unit: 'unit.mg/dl',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private animalGroupService: AnimalGroupService,
    private animalService: AnimalService,
    private logger: LoggerService,
    private modalDialogService: ModalDialogService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe((route) => {
      const id = +route?.id;
      this.logger.debug('load animal group with id: ', id);
      this.animalGroupService.setActiveAnimalGroupId(id);
    });

    this.animalGroupService.activeAnimalGroup$.pipe(takeUntil(this.destroy)).subscribe((animalGroup) => {
      this.animalGroup = animalGroup;
      this.animalGroupTableConfig = {
        ...animalGroupTableConfig,
        title: `${this.translocoService.translate('overview')} ${animalGroup?.name || ''}`,
      };
      this.animalGroupAnimals = cloneDeep(animalGroup.animals);
    });
    this.animalService.animals$.pipe(takeUntil(this.destroy)).subscribe((animals) => {
      this.animals = animals;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  showEditModal(): void {
    console.log('showEditModal');
  }

  onAnimalGroupActionRow(actionEvent: ActionRowEvent<AnimalDto>): void {
    if (actionEvent.actionId === 'add') {
      this.showAddAnimalModal();
    }
  }

  showAddAnimalModal(): void {
    this.modalDialogService.showTableDialog<AnimalDto>(
      {
        title: 'animal.select',
        acceptLabel: 'dialog.button.save',
        cancelLabel: 'dialog.button.cancel',
        tableInfo: {
          data: this.animals,
          initSelectedData: this.animalGroup.animals,
          columnDefs: animalTableColumnDefs,
          config: animalTableGridTableConfig,
        },
      },
      (selectedAnimals: AnimalDto[]) => {
        this.animalGroup.animals = selectedAnimals;
        this.animalGroupService.save(this.animalGroup);
      },
      () => {
        //cancel
      }
    );
  }
}
