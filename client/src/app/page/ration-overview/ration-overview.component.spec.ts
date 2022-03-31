import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RationOverviewComponent } from './ration-overview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { AnimalGroupService } from '../../services/animal-group.service';
import { of } from 'rxjs';
import { getTranslocoModule } from '../../shared/transloco/transloco-testing.module';
import { AnimalGroupDto, CompanyBranchDto } from '../../gen';
import { BsAgGridModule } from '@biskin-kit/ag-grid';
import { CompanyBranchService } from '../../services/company-branch.service';

describe('RationOverviewComponent', () => {
  let component: RationOverviewComponent;
  let fixture: ComponentFixture<RationOverviewComponent>;

  const mockAnimalGroupService: AnimalGroupService = createSpyObj('AnimalGroupService', ['animalGroups$']);
  mockAnimalGroupService.animalGroups$ = of([{ id: 1, name: 'test1' } as AnimalGroupDto]);

  const mockCompanyBranchService: CompanyBranchService = createSpyObj('CompanyBranchService', ['companyBranch$']);
  mockCompanyBranchService.companyBranch$ = of({ id: 1, name: 'company' } as CompanyBranchDto);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RationOverviewComponent],
      imports: [getTranslocoModule(), SharedModule, RouterTestingModule.withRoutes([]), RouterModule, BsAgGridModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AnimalGroupService,
          useValue: mockAnimalGroupService,
        },
        {
          provide: CompanyBranchService,
          useValue: mockCompanyBranchService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
