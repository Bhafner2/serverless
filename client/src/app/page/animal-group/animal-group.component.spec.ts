import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { AnimalGroupComponent } from './animal-group.component';
import { of } from 'rxjs';
import { AnimalGroupService } from '../../services/animal-group.service';
import { getTranslocoModule } from '../../shared/transloco/transloco-testing.module';
import { AnimalDto, AnimalGroupDto } from '../../gen';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimalService } from '../../services/animal.service';
import { ModalDialogService } from '../../shared';

describe('AnimalGroupComponent', () => {
  let component: AnimalGroupComponent;
  let fixture: ComponentFixture<AnimalGroupComponent>;

  const mockModalDialogService: ModalDialogService = createSpyObj('ModalDialogService', ['showTableDialog']);
  mockModalDialogService.showTableDialog = jest.fn();

  const mockAnimalGroupService: AnimalGroupService = createSpyObj('AnimalGroupService', [
    'activeAnimalGroup$',
    'setActiveAnimalGroup',
  ]);
  mockAnimalGroupService.setActiveAnimalGroupId = jest.fn();
  mockAnimalGroupService.activeAnimalGroup$ = of({ id: 1, name: 'test1' } as AnimalGroupDto);

  const mockAnimalService: AnimalService = createSpyObj('AnimalService', ['animals$']);
  mockAnimalService.animals$ = of([{ id: 1, name: 'test1' } as AnimalDto]);

  const mockRoute: ActivatedRoute = createSpyObj('ActivatedRoute', ['params']);
  mockRoute.params = of({ id: '1' } as Params);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalGroupComponent],
      imports: [getTranslocoModule(), SharedModule, RouterTestingModule.withRoutes([]), RouterModule, NgbNavModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AnimalGroupService,
          useValue: mockAnimalGroupService,
        },
        {
          provide: AnimalService,
          useValue: mockAnimalService,
        },
        {
          provide: ModalDialogService,
          useValue: mockModalDialogService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lifecycle', () => {
    component.ngOnInit();

    expect(component.destroy).toBeDefined();
  });

  it('lifecycle', () => {
    jest.spyOn(component['destroy'], 'next');
    jest.spyOn(component['destroy'], 'complete');

    component.ngOnDestroy();

    expect(component.destroy.next).toHaveBeenCalledTimes(1);
    expect(component.destroy.complete).toHaveBeenCalledTimes(1);
  });

  it('activeAnimalGroup', (done) => {
    component.ngOnInit();

    mockAnimalGroupService.activeAnimalGroup$.subscribe((route) => {
      expect(component.animalGroup).toStrictEqual({ id: 1, name: 'test1' });
      done();
    });
  });

  it('route', (done) => {
    component.ngOnInit();

    mockRoute.params.subscribe((route) => {
      expect(mockAnimalGroupService.setActiveAnimalGroupId).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should call showAddAnimalModal on add action Event', () => {
    component.onAnimalGroupActionRow({ actionId: 'add' });
    expect(mockModalDialogService.showTableDialog).toHaveBeenCalled();
  });

  it('modal', () => {
    component.showAddAnimalModal();
    expect(mockModalDialogService.showTableDialog).toHaveBeenCalled();
  });
});
