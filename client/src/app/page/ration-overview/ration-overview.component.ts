import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimalGroupService } from '../../services/animal-group.service';
import { CompanyBranchService } from '../../services/company-branch.service';
import { animalGroupsTableColumnDefs, animalGroupsTableConfig } from './animal-groups-table';
import { ActionRowEvent } from '../../shared/grid-table';
import { AnimalGroupDto } from '../../gen';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ration-overview',
  templateUrl: './ration-overview.component.html',
  styleUrls: ['./ration-overview.component.scss'],
})
export class RationOverviewComponent implements OnInit, OnDestroy {
  animalGroups: AnimalGroupDto[];
  companyBranch = this.companyBranchService.companyBranch$;

  animalGroupsTableColumnDefs = animalGroupsTableColumnDefs;
  animalGroupsTableConfig = animalGroupsTableConfig;

  destroy = new Subject<void>();
  constructor(
    private animalGroupService: AnimalGroupService,
    private companyBranchService: CompanyBranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalGroupService.animalGroups$.pipe(takeUntil(this.destroy)).subscribe((animalGroups) => {
      this.animalGroups = animalGroups;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onAnimalGroupsActionRow(actionEvent: ActionRowEvent<AnimalGroupDto>): void {
    if (actionEvent.actionId === 'add') {
      this.router.navigate(['/animal-group/new']);
    }
  }
}
